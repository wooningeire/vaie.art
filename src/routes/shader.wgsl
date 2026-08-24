@group(0) @binding(0) var<storage, read> verts: array<vec4f>;

struct VertOut {
    @builtin(position) pos_builtin: vec4f,
    @location(0) pos: vec4f,
}

@vertex
fn vert(
    @location(0) pos: vec4f,
) -> VertOut {
    var out: VertOut;

    out.pos_builtin = pos;
    out.pos = pos;

    return out;
}

@fragment
fn frag(
    in: VertOut,
) -> @location(0) vec4f {
    return in.pos;
}