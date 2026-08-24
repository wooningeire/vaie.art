<script lang="ts">
import { galleryProjects } from "$/gallery-models/galleryProjectList";
import Gallery from "@/gallery/Gallery.svelte";
    import { onMount } from "svelte";
import shaderCode from "./shader.wgsl?raw";
    import { RendererState } from "./RendererState.svelte";

const {resolve: resolveCanvas, promise: canvasPromise} = Promise.withResolvers<HTMLCanvasElement>();
const rendererState = RendererState.mount({canvasPromise});

let canvas: HTMLCanvasElement;


onMount(async () => {
    resolveCanvas(canvas);

    const adapter = await navigator.gpu.requestAdapter();
    if (adapter === null) return;


    const context = canvas.getContext("webgpu");
    if (context === null) return;

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


    const commandEncoder = device.createCommandEncoder({
        label: "command encoder",
    });

    const view = context.getCurrentTexture().createView({
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
    renderPassEncoder.setBindGroup(0, bindGroup);
    renderPassEncoder.setVertexBuffer(0, verts);
    renderPassEncoder.setPipeline(renderPipeline);
    renderPassEncoder.draw(3);
    renderPassEncoder.end();


    device.queue.submit([commandEncoder.finish()]);
});

let width = 300;
let height = 150;
</script>

<svelte:head>
    <title>vaiezzell&#x2019;s den!</title>
</svelte:head>

<home-page>
    <canvas-container
        bind:clientWidth={null, clientWidth => width = clientWidth! * devicePixelRatio}
        bind:clientHeight={null, clientHeight => height = clientHeight! * devicePixelRatio}
    >
        <canvas
            bind:this={canvas}
            {width}
            {height}
        ></canvas>
    </canvas-container>
    <!-- <Gallery projects={galleryProjects} /> -->
</home-page>

<style lang="scss">
home-page {
    > canvas-container {
        grid-area: 1/1;
        height: 100%;

        display: grid;

        > canvas {
            place-items: stretch;
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>
