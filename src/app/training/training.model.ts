export interface Training {
    id: string;
    name: string;
    duration: number;
    calories: number;
    state?: "completed" | "cancelled" | null;
    date?: Date;
    progress?: number;
}