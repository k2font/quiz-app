// JavaScriptのオブジェクトのこと
// type、それに対応する値を持つ。
// typeの値はユニークなものでなければならない

// アクションを返す関数をActionCreatorと呼ぶ

import { db, firebase } from '../Firebase';

export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const PUT_EVENT = 'PUT_EVENT'

export const QUIZ_EVENT = 'QUIZ_EVENTS'
export const QUIZ_END_EVENT = 'QUIZ_END_EVENTS'
export const QUIZ_CHECK_EVENT = 'QUIZ_CHECK_EVENT'
export const QUIZ_COLLECT_EVENT = 'QUIZ_COLLECT_EVENT'
export const QUIZ_WAIT_EVENT = 'QUIZ_WAIT_EVENTS'
export const RANKING_EVENT = 'RANKING_EVENT'
export const RANKING_READ = 'RANKING_READ'

export const COUNT_EVENT = 'COUNT_EVENT'
export const ANSWER_RESULT = 'ANSWER_RESULT'
export const PLAYER_STATUS = 'PLAYER_STATUS'

export const LOGIN = 'LOGIN'

export const WAIT_STATE = 'WAIT_STATE'
export const QID_STATE = 'QID_STATE'
export const QUIZ_CONTENT = 'QUIZ_CONTENT'
export const ANSWERS_STATE = 'ANSWERS_STATE'

export const NEXT_PERIOD = 'NEXT_PERIOD'

export const QUIZ_SET = 'QUIZ_SET'
export const CREATE_EVENT_IMAGE = 'CREATE_EVENT_IMAGE'


/* ================ */
/*      ログイン     */
/* ================ */

// クイズ終了であることを示すstateをfirestoreに格納
export const LogIn = (id) => dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
}

// クイズ終了であることを示すstateをfirestoreに格納
export const LogOut = (id) => dispatch => {
    firebase.auth().signOut()
}

export const authStateChanged = () => dispatch => {
    firebase.auth().onAuthStateChanged(user => {
        console.log(user)
        const uid = user.uid
        dispatch({ type: LOGIN, uid })
    })
}

// 現在活用していないActionCreator
// 利用は非推奨
export const getRedirectResult = () => dispatch => {
    firebase.auth().getRedirectResult().then(function(result) {
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("user get error!")
        console.log(errorCode, errorMessage, email, credential)
    });
}

/* ================ */
/*  クイズウインドウ   */
/* ================ */

// 回答者キーパッド側がwaitの状態をリアルタイムに取得するためのActionCreator
export const readQuizContent = (qid) => dispatch => {
    var docRef = db.collection("quiestion").doc(qid);

    docRef.onSnapshot(function(doc) {
        var response = doc.data()
        const quiz = response
        dispatch({ type: QUIZ_CONTENT, quiz })
    });
}

// 回答数を計算するActionCreator
export const countAnswer = (qid) => dispatch => {
    console.log("countAnsewr")
    db.collection(qid).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
        dispatch({ type: ANSWER_RESULT,  })
    });
}

/* =============== */
/*   ランキング      */
/* =============== */

export const rankingRead = () => dispatch => {
    var docRef = db.collection("state").doc("ranking-state");

    docRef.onSnapshot(function(doc) {
        var response = doc.data()
        const ranking = response
        dispatch({ type: RANKING_READ, ranking })
    });
}

/* ================ */
/*   回答者          */
/* ================ */

export const postPlayerName = (value, uid) => dispatch => {
    var docRef = db.collection("users").doc(uid);

    docRef.set({
        nickname: value.nickname,
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// 回答者キーパッド側がwaitの状態をリアルタイムに取得するためのActionCreator
export const readWaitState = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");
    var docRef_wait = db.collection("state").doc("wait-state");
    var docRef_ans = db.collection("state").doc("answer-state");

    docRef.onSnapshot(function(doc) {
        var response = doc.data()
        const quiz = response
        console.log(quiz)
        dispatch({ type: QID_STATE, quiz })
    });

    docRef_wait.onSnapshot(function(doc) {
        var response = doc.data()
        const wait = response.wait
        dispatch({ type: WAIT_STATE, wait })
    });

    docRef_ans.onSnapshot(function(doc) {
        var response = doc.data()
        const answers = response.answers
        dispatch({ type: ANSWERS_STATE, answers })
    });
}

// 回答者キーパッド側がwaitの状態をリアルタイムに取得するためのActionCreator
export const readPlayerName = (uid) => dispatch => {
    var docRef = db.collection("users").doc(uid);
    console.log(uid)

    docRef.onSnapshot(function(doc) {
        var response = doc.data()
        dispatch({ type: PLAYER_STATUS, response })
    });
}

// firestoreにユーザごとの回答を送信するActionCreator
// uid: ユーザのuid(ユーザごとに一意に定まる)
// qid: 問題ID(問題ごとに一意に定まる)
// answer: そのユーザが選択した回答
// TODO: 回答時間をセットできるようにせよ
export const sendAnswer = (uid, qid, answer) => dispatch => {
    var docRef = db.collection(qid).doc(answer)

    docRef.set({
        answer_user: firebase.firestore.FieldValue.arrayUnion(uid),
    }, {merge: true}).then(function() {
        console.log("I set the user " + uid + "'s answer! This user's answer is " + answer);
        // reducerに送信する値はいらない
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


/* ================ */
/*   ゲームマスター   */
/* ================ */

// クイズ一覧を呼び出すActionCreator
export const quizSet = () => dispatch => {
    db.collection("question").onSnapshot(function(doc) {
        console.log(doc)
        doc.forEach((_doc) => {
            var response = _doc.data()
            response.id = _doc.id
            dispatch({ type: QUIZ_SET, response })
        });
    });
}

// クイズ開始であることを示すstateをfirestoreに格納
export const quizEvents = (qid) => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");
    var docRef_wait = db.collection("state").doc("wait-state");

    console.log(qid.id)

    docRef.update({
        readygo: true,
        quiz_id: qid.id,
    }).then(function() {
        console.log("quiz start!");
        const readygo = true
        dispatch({ type: QUIZ_EVENT, readygo })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    // クイズ開始と同時にwaitをfalseへ(問題待機待ちを解除)
    docRef_wait.update({
        wait: false,
    }).then(function() {
        const wait = false
        dispatch({ type: QUIZ_WAIT_EVENT, wait })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// クイズ終了であることを示すstateをfirestoreに格納
export const quizEndEvents = (id) => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        readygo: false,
        calc: true,
    }).then(function() {
        console.log("Quiz Finish!");
        const readygo = false
        dispatch({ type: QUIZ_END_EVENT, readygo })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// その時点の回答状況をクイズ画面上に表示するためのActionCreator
export const quizCheckEvents = (id) => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        check: true,
        calc: false,
    }).then(function() {
        console.log("Answer Check!");
        const check = true
        // dispatch({ type: QUIZ_CHECK_EVENT, check })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// クイズ表示画面に正解をハイライトするActionCreator
export const quizCollectEvents = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        collect: true,
    }).then(function() {
        console.log("The collect answer is ...");
        const collect = true
        dispatch({ type: QUIZ_COLLECT_EVENT, collect })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// クイズ表示画面に正解をハイライトするActionCreator
export const quizCollectEventsA = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        collect: true,
        answer: "A",
    }).then(function() {
        console.log("The collect answer is ...");
        const collect = true
        // dispatch({ type: QUIZ_COLLECT_EVENT, collect })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// クイズ表示画面に正解をハイライトするActionCreator
export const quizCollectEventsB = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        collect: true,
        answer: "B",
    }).then(function() {
        console.log("The collect answer is ...");
        const collect = true
        // dispatch({ type: QUIZ_COLLECT_EVENT, collect })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// クイズ表示画面に正解をハイライトするActionCreator
export const quizCollectEventsC = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        collect: true,
        answer: "C",
    }).then(function() {
        console.log("The collect answer is ...");
        const collect = true
        // dispatch({ type: QUIZ_COLLECT_EVENT, collect })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// クイズ表示画面に正解をハイライトするActionCreator
export const quizCollectEventsD = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        collect: true,
        answer: "D",
    }).then(function() {
        console.log("The collect answer is ...");
        const collect = true
        // dispatch({ type: QUIZ_COLLECT_EVENT, collect })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// その時点の正解者の回答時間ランキングを作成し、ランキングウインドウに表示するActionCreator
// ランキング表示をした時点で、checkもcollectもfalseになる => すなわちクイズ表示画面から回答数と正解番号のハイライトが消える
export const rankingEvents = (id) => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        ranking: true,
        check: false,
        collect: false,
    }).then(function() {
        console.log("Ranking!");
        const ranking = true
        dispatch({ type: RANKING_EVENT, ranking })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// 問題待機中であることを示すstateをfirestoreに格納
// quiz-stateのすべてのstateをfalseにして初期化
export const waitQuiz = (id) => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");
    var docRef_wait = db.collection("state").doc("wait-state");

    docRef.update({
        readygo: false,
        ranking: false,
        check: false,
        collect: false,
        calc: false,
    }).then(function() {
        console.log("Wait!");
        const wait = true
        dispatch({ type: QUIZ_WAIT_EVENT, wait })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    docRef_wait.update({
        wait: true,
    }).then(function() {
        console.log("Wait!");
        const wait = true
        dispatch({ type: QUIZ_WAIT_EVENT, wait })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// 次のピリオドに行く際に、キーパッド側のすべてのstateを初期化するActionCreator
// state/quiz-stateのresetのみtrueにする
export const goNextPeriod = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");

    docRef.update({
        reset: true,
    }).then(function() {
        console.log("Ranking!");
        const reset = true
        dispatch({ type: NEXT_PERIOD, reset })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


/* ================ */
/* クイズ一覧読み書き  */
/* ================ */
export const readEvents = () => dispatch => {
    db.collection("question").onSnapshot(function(doc) {
        doc.forEach((_doc) => {
            var response = _doc.data()
            response.id = _doc.id
            dispatch({ type: READ_EVENTS, response })
        });
    });
}

export const postEvent = (values) => dispatch => {
    db.collection("question").add({
        answer: values.answer,
        choice1: values.choice1,
        choice2: values.choice2,
        choice3: values.choice3,
        choice4: values.choice4,
        question: values.question,
        qtype: "text",
    })
    .then(function(docRef) {
        const response = docRef.id;
        console.log("document id is : ", response);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const postEventImage = (values) => dispatch => {
    db.collection("question").add({
        answer: values.answer,
        choice1: values.choice1,
        choice2: values.choice2,
        choice3: values.choice3,
        choice4: values.choice4,
        question: values.question,
        qtype: "image",
    })
    .then(function(docRef) {
        const response = docRef.id;
        console.log("document id is : ", response);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const getEvent = (id) => dispatch => {
    var docRef = db.collection("question").doc(id);

    docRef.get().then(function(doc) {
        var response = doc.data()
        response.id = doc.id
        dispatch({ type: READ_EVENT, response })
    }).catch(function(error) {
        console.log("Error getting cached document:", error);
    });
}

export const deleteEvent = (id) => dispatch => {
    var docRef = db.collection("question").doc(id);

    docRef.delete().then(function() {
        console.log("Document successfully deleted!");
        dispatch({ type: DELETE_EVENT, id })
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export const putEvent = (values) => dispatch => {
    var docRef = db.collection("question").doc(values.id);

    docRef.set({
        answer: values.answer,
        choice1: values.choice1,
        choice2: values.choice2,
        choice3: values.choice3,
        choice4: values.choice4,
        question: values.question,
    });
}

// TODO: 管理画面のボタンを押すと、firestoreのstateコレクションに値を格納するactionおよびactioncreatorを書け。