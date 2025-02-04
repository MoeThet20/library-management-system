export const USER_DASHBOARD = "/";
export const ADMIN_DASHBOARD = "/admin";

export const TEACHER_LIST = "/admin/teacher/list";
export const TEACHER_CREATE = "/admin/teacher/create";
export const TEACHER_UPDATE = "/admin/teacher/update";

export const STUDENT_LIST = "/admin/student/list";
export const STUDENT_CREATE = "/admin/student/create";
export const STUDENT_UPDATE = "/admin/student/update";

export const BOOK_LIST = "/admin/book/list";
export const BOOK_CREATE = "/admin/book/create";
export const BOOK_UPDATE = "/admin/book/update";

export const CATEGORY_LIST = "/admin/category/list";
export const CATEGORY_CREATE = "/admin/category/create";
export const CATEGORY_UPDATE = "/admin/category/update";

export const BORROW_LIST = "/admin/borrow/list";
export const BORROW_CREATE = "/admin/borrow/create";

export const RETURN_LIST = "/admin/return/list";
export const RETURN_CREATE = "/admin/return/create";

export const LOGIN = "/login";
export const REGISTER = "/register";

export const PUBLIC_ROUTE = [LOGIN];

export const LOADING_DISABLE = [
  TEACHER_LIST,
  STUDENT_LIST,
  BOOK_LIST,
  CATEGORY_LIST,
  BORROW_LIST,
  RETURN_LIST,
];
