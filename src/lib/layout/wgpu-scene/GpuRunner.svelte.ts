import shaderCode from "./shader.wgsl?raw";

export class GpuRunner {
    private readonly device: GPUDevice;
    private readonly context: GPUCanvasContext;

    private readonly bindGroup: GPUBindGroup;
    private readonly verts: GPUBuffer;
    private readonly renderPipeline: GPURenderPipeline;

    private constructor({
        device,
        context,

        bindGroup,
        verts,
        renderPipeline,
    }: {
        device: GPUDevice,
        context: GPUCanvasContext,

        bindGroup: GPUBindGroup,
        verts: GPUBuffer,
        renderPipeline: GPURenderPipeline,
    }) {
        this.device = device;
        this.context = context;

        this.bindGroup = bindGroup;
        this.verts = verts;
        this.renderPipeline = renderPipeline;
    }

    static async create({
        canvas,
    }: {
        canvas: HTMLCanvasElement,
    }) {
        const adapter = await navigator.gpu.requestAdapter();
        if (adapter === null) return null;


        const context = canvas.getContext("webgpu");
        if (context === null) return null;

        const device = await adapter.requestDevice({});
        const format = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device,
            format,
            alphaMode: "premultiplied",
        });


        const bindGroupLayout = device.createBindGroupLayout({
            label: "bind group layout",
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                    buffer: {
                        type: "read-only-storage",
                    },
                },
            ],
        });

        const verts = device.createBuffer({
            label: "verts buffer",
            size: 48,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
        });
        device.queue.writeBuffer(verts, 0, new Float32Array([
            -0.75, -0.75, 0.5, 1,
            0, 0.8, 0.5, 1,
            0.75, -0.75, 0.5, 1,
        ]));

        const bindGroup = device.createBindGroup({
            label: "bind group",
            layout: bindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: verts,
                },
            ],
        });


        const module = device.createShaderModule({
            label: "vertex module",
            code: shaderCode,
        });

        const renderPipelineLayout = device.createPipelineLayout({
            label: "render pipeline layout",
            bindGroupLayouts: [bindGroupLayout],
        });

        const renderPipeline = device.createRenderPipeline({
            label: "render pipeline",
            layout: renderPipelineLayout,
            vertex: {
                module,
                entryPoint: "vert",
                buffers: [
                    {
                        attributes: [
                            {
                                shaderLocation: 0,
                                offset: 0,
                                format: "float32x4",
                            },
                        ],
                        arrayStride: 16,
                        stepMode: "vertex",
                    },
                ],
            },
            
            fragment: {
                module,
                entryPoint: "frag",
                targets: [
                    {
                        format,
                    },
                ],
            },

            primitive: {
                topology: "triangle-list",
            },

            // depthStencil: {
            //     depthWriteEnabled: true,
            //     depthCompare: "less",
            // }
        });

        return new GpuRunner({
            device,
            context,

            bindGroup,
            verts,
            renderPipeline,
        });
    }

    draw() {
        const commandEncoder = this.device.createCommandEncoder({
            label: "command encoder",
        });

        const view = this.context.getCurrentTexture().createView({
            label: "view",
        });

        const renderPassEncoder = commandEncoder.beginRenderPass({
            label: "render pass",
            colorAttachments: [
                {
                    clearValue: {r: 0, g: 0, b: 0, a: 0},
                    loadOp: "clear",
                    storeOp: "store",
                    view,
                }
            ],
        });
        renderPassEncoder.setBindGroup(0, this.bindGroup);
        renderPassEncoder.setVertexBuffer(0, this.verts);
        renderPassEncoder.setPipeline(this.renderPipeline);
        renderPassEncoder.draw(3);
        renderPassEncoder.end();

        this.device.queue.submit([commandEncoder.finish()]);
    }
}