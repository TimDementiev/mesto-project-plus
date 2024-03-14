export const BAD_REQUEST = {
  code: 400,
  message:
    "переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля",
};

export const INVALID_ID_ERROR = {
  code: 400,
  message: "Передан невалидный id",
};

export const AUTHORIZATION_ERROR = {
  code: 401,
  message: "Неправильные почта или пароль",
};

export const UNAURHORIZATION_ERROR = {
  code: 401,
  message: "Необходима авторизация",
};

export const FORBIDDEN_ERROR = {
  code: 403,
  message: "Недостаточно прав",
};

export const NOT_FOUND_REQUEST = {
  code: 404,
  message: "карточка или пользователь не найден",
};

export const NOT_FOUND_PAGE = {
  code: 404,
  message: "страница не найдена",
};

export const CONFLICT_ERROR = {
  code: 409,
  message: "Пользователь с такой почтой уже существует",
};

export const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: "На сервере произошла ошибка",
};
