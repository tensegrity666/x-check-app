const actionTaskList = {
  CREATE_TASK: 'CREATE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  DELETE_TASK: 'DELETE_TASK',
  DRAFT_TO_PUBLISHED:
    'DRAFT_TO_PUBLISHED' /* опубликовано, видят пользователи, можно создать запрос на ревью и кросс-чек  */,
  PUBLISHED_TO_DRAFT:
    'PUBLISHED_TO_DRAFT' /* супервизор вернул на доработку, видит только автор */,
  PUBLISHED_TO_ARCHIVED:
    'PUBLISHED_TO_ARCHIVED' /* супервизор перевел задачу в архив, видят все, нельзя создать запрос на ревью и кросс-чек */,
  ARCHIVED_TO_PUBLISHED:
    'ARCHIVED_TO_PUBLISHED' /* супервизор вернул в опубликовано, можно создать запрос на ревью и кросс-чек */,
};

const actionRevReqList = {
  CREATE_REVREQ: 'CREATE_REVREQ',
  EDIT_REVREQ: 'EDIT_REVREQ',
  DELETE_REVREQ: 'DELETE_REVREQ',
  DRAFT_TO_PUBLISHED:
    'DRAFT_TO_PUBLISHED' /* опубликовано, видят пользователи, можно проводить ревью и кросс-чек сессии */,
  PUBLISHED_TO_DRAFT:
    'PUBLISHED_TO_DRAFT' /* супервизор вернул на доработку, видит только автор  */,
  PUBLISHED_TO_COMPLETED:
    'PUBLISHED_TO_COMPLETED' /* запрос на ревью помечен как выполненный, супервизором или системой */,
  COMPLETED_TO_PUBLISHED:
    'COMPLETED_TO_PUBLISHED' /* запрос на ревью вернули на опубликование супервизором */,
};

const actionCCSessionCheckList = {
  CREATE_CROSSCHECK: 'CREATE_CROSSCHECK',
  EDIT_CROSSCHECK: 'EDIT_CROSSCHECK',
  DELETE_CROSSCHECK: 'DELETE_CROSSCHECK',
  DRAFT_TO_REQUESTS_GATHERING:
    'DRAFT_TO_REQUESTS_GATHERING' /* кросс-чек-сессия в стади сбора запросов на ревью */,
  REQUESTS_GATHERING_TO_CROSS_CHECK:
    'REQUESTS_GATHERING_TO_CROSS_CHECK' /* запросы собраны, пары распределены, кросс-чек-сессия в стадии ревью */,
  CROSS_CHECK_TO_COMPLETED:
    'CROSS_CHECK_TO_COMPLETED' /* кросс-чек-сессия закрыта */,
};

const actionReviewList = {
  CREATE_REVIEW: 'CREATE_REVIEW',
  EDIT_REVIEW: 'EDIT_REVIEW',
  DELETE_REVIEW: 'DELETE_REVIEW',
  DRAFT_TO_PUBLISHED:
    'DRAFT_TO_PUBLISHED' /* опубликовано, видит студент которого проверяют */,
  PUBLISHED_TO_DISPUTED:
    'PUBLISHED_TO_DISPUTED' /* студент отклонил оценку и оспаривает какой то пункт */,
  PUBLISHED_TO_ACCEPTED: 'PUBLISHED_TO_ACCEPTED' /* студент принял оценку */,
  DISPUTED_TO_ACCEPTED:
    'DISPUTED_TO_ACCEPTED' /* проверяющий утвердил оценку */,
  ACCEPTED_TO_REJECTED:
    'ACCEPTED_TO_REJECTED' /* супервизор отклонил оценку, она не учитывается при подсчет финальной оценки */,
  REJECTED_TO_ACCEPTED:
    'REJECTED_TO_ACCEPTED' /* супервизор отменил отклонение, оценка учитывается в финальном подсчете */,
  REJECTED_TO_DISPUTED:
    'REJECTED_TO_DISPUTED' /* супервизор вернул оценку на пересмотр ревьювером */,
};

export {
  actionTaskList,
  actionRevReqList,
  actionCCSessionCheckList,
  actionReviewList,
};
