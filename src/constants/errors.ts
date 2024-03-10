export const BAD_REQUEST = {
  code: 400,
  message:
    "переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля",
};

export const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: "ошибка по умолчанию",
};

export const NOT_FOUND_REQUEST = {
  code: 404,
  message: "карточка или пользователь не найден",
};

export const NOT_FOUND_PAGE = {
  code: 404,
  message: "страница не найдена",
};
