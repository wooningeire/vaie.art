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

export interface PriorityEnum extends PbRecord {
	label: string;
	value: number;
}

export interface CompletionEnum extends PbRecord {
	label: string;
}

export interface Task extends PbRecord {
	label: string;
	priority: string;
	parent_task: string;
	target_start: string;
	target_due: string;
	hard_due: string;
	completion: string;
	n_extra_hours: number;
	expand?: {
		priority?: PriorityEnum;
		completion?: CompletionEnum;
	};
}

export interface TimePeriod extends PbRecord {
	start: string;
	end: string;
	task: string;
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
