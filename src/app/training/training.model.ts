export interface Training {
    id: number;
    name: string;
    duration: number;
    calories: number;
    state?: "completed" | "cancelled" | null;
    date?: Date;
    progress?: number;
}