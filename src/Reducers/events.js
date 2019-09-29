import {
    CREATE_EVENT,
    READ_EVENTS,
    READ_EVENT,
    PUT_EVENT,
    DELETE_EVENT,
    QUIZ_CONTENT,
    QUIZ_CHECK_EVENT,
    QUIZ_COLLECT_EVENT,
    QID_STATE,
    LOGIN,
    WAIT_STATE,
    QUIZ_SET,
} from '../Actions'

export default (events = {}, action) => {
    //actionの値に応じて処理を変化させる。
    switch(action.type) {
        // 今回、actionの値は2つの値をとる
        // actionの値が未定義の場合、stateの値を返す
        case WAIT_STATE:
            return {...events, "wait": action.wait}
        case LOGIN:
            return {...events, "uid": action.uid}
        case QID_STATE:
            return {...events, "quiz": action.quiz}
        case QUIZ_CONTENT:
            return {...events, "content": action.quiz}
        case QUIZ_CHECK_EVENT:
            console.log(action)
            return {...events, "check": action.check}
        case QUIZ_COLLECT_EVENT:
            return {...events, "collect": action.collect}
        case CREATE_EVENT:
        case READ_EVENT:
        case PUT_EVENT:
            return {...events, [action.response.id]: action.response}
        case READ_EVENTS:
        case QUIZ_SET:
            return {...events, [action.response.id]: action.response}
        case DELETE_EVENT:
            delete events[action.id]
            return {...events}
        default:
            return events
    }
}