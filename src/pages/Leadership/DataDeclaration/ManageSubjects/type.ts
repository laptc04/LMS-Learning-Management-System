export interface Course {
  id: string;
  code: string;
  name: string;
  type: 'Môn bắt buộc' | 'Môn tự chọn';
  creditsHK1: number;
  creditsHK2: number;
}
