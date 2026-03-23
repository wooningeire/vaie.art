import { PUBLIC__POCKETBASE_API } from "$env/static/public";

const BASE = PUBLIC__POCKETBASE_API.replace(/\/+$/, "");

export interface PbListResult<T> {
	page: number;
	perPage: number;
	totalPages: number;
	totalItems: number;
	items: T[];
}

export interface PbRecord {
	id: string;
	created: string;
	updated: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${BASE}${path}`, init);
	if (!res.ok) throw new Error(`PB ${res.status}: ${await res.text()}`);
	return res.json();
}

export function list<T extends PbRecord>(collection: string, params: Record<string, string> = {}): Promise<PbListResult<T>> {
	const query = new URLSearchParams({ perPage: "200", ...params }).toString();
	return request(`/collections/${collection}/records?${query}`);
}

export function create<T extends PbRecord>(collection: string, data: Record<string, unknown>): Promise<T> {
	return request(`/collections/${collection}/records`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
}

export function update<T extends PbRecord>(collection: string, id: string, data: Record<string, unknown>): Promise<T> {
	return request(`/collections/${collection}/records/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
}

export function remove(collection: string, id: string): Promise<void> {
	return request(`/collections/${collection}/records/${id}`, {
		method: "DELETE",
	});
}
