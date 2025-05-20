export declare namespace Array {
	export type NonArray<T> = T extends readonly unknown[] ? never : T;
}
