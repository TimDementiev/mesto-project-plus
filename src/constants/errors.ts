const errorCode = {
  BAD_REQUEST: 400,
  AUTHORIZATION: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER: 500,
};

const errorMessage = {
  BAD_REQUEST: 'Переданы некорректные данные',
  INVALID_ID_ERROR: 'Передан невалидный id',
  AUTHORIZATION_ERROR: 'Неправильные почта или пароль',
  UNAURHORIZATION_ERROR: 'Необходима авторизация',
  FORBIDDEN_ERROR: 'Недостаточно прав',
  NOT_FOUND_REQUEST: 'Карточка или пользователь не найден',
  NOT_FOUND_PAGE: 'Страница не найдена',
  CONFLICT_ERROR: 'Пользователь с такой почтой уже существует',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка',
};

export const ERROR = {
  code: errorCode,
  message: errorMessage,
};