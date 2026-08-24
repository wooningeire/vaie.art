export class RendererState {
    readonly device: GPUDevice;
    readonly context: GPUCanvasContext;
    readonly format: GPUTextureFormat;

    constructor({
        device,
        context,
        format,
    }: {
        device: GPUDevice,
        context: GPUCanvasContext,
        format: GPUTextureFormat,
    }) {
        this.device = device;
        this.context = context;
        this.format = format;
    }

    static async mount({
        canvasPromise,
    }: {
        canvasPromise: Promise<HTMLCanvasElement>,
    }) {
        const adapter = await navigator.gpu.requestAdapter();
        if (adapter === null) return null;

        const canvas = await canvasPromise;
        const context = canvas.getContext("webgpu");
        if (context === null) return null;

        const device = await adapter.requestDevice({});
        const format = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device,
            format,
            alphaMode: "premultiplied",
        });

        return new RendererState({
            device,
            context,
            format,
        });
    }
}