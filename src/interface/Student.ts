export interface Student {
    _id: string; 

    userName: string; // 帳號

    sid: string; // 座號

    name: string; // 姓名

    department: string; // 院系

    grade: string; // 年級

    class: string; // 班級

    email: string; // Email

    absences?: number; // 缺席次數
}
