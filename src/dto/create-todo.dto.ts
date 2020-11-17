export class CreateTodoDto {
  readonly todo_id: string;
  readonly text: string;
  readonly status?: boolean;
}
