export class CreateTodoDto {
  readonly create_by?: string;
  readonly text: string;
  readonly status?: boolean;
}
