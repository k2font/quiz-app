// JavaScriptのオブジェクトのこと
// type、それに対応する値を持つ。
// typeの値はユニークなものでなければならない

// アクションを返す関数をActionCreatorと呼ぶ

import ENV from '../env.json';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.FIREBASE_DB_URL,
    projectId: ENV.FIREBASE_PRJ_ID,
    storageBucket: ENV.FIREBASE_STORAGE,
    messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(firebaseConfig);

export const fba = firebase.auth()

var db = firebase.firestore();

export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const PUT_EVENT = 'PUT_EVENT'

export const QUIZ_EVENT = 'QUIZ_EVENTS'
export const QUIZ_END_EVENT = 'QUIZ_END_EVENTS'
export const QUIZ_CHECK_EVENT = 'QUIZ_CHECK_EVENTS'
export const QUIZ_COLLECT_EVENT = 'QUIZ_COLLECT_EVENTS'
export const QUIZ_WAIT_EVENT = 'QUIZ_WAIT_EVENTS'
export const RANKING_EVENT = 'RANKING_EVENT'

export const LOGIN = 'LOGIN'

export const WAIT_STATE = 'WAIT_STATE'
export const QID_STATE = 'QID_STATE'

export const QUIZ_SET = 'QUIZ_SET'


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
/*   回答者          */
/* ================ */

// 回答者キーパッド側がwaitの状態をリアルタイムに取得するためのActionCreator
export const readWaitState = () => dispatch => {
    var docRef = db.collection("state").doc("quiz-state");
    var docRef_wait = db.collection("state").doc("wait-state");

    docRef.onSnapshot(function(doc) {
        var response = doc.data()
        const qid = response.quiz_id
        dispatch({ type: QID_STATE, qid })
    });

    docRef_wait.onSnapshot(function(doc) {
        var response = doc.data()
        console.log(response)
        const wait = response.wait
        dispatch({ type: WAIT_STATE, wait })
    });
}

// firestoreにユーザごとの回答を送信するActionCreator
// uid: ユーザのuid(ユーザごとに一意に定まる)
// qid: 問題ID(問題ごとに一意に定まる)
// answer: そのユーザが選択した回答
// TODO: 回答時間をセットできるようにせよ
export const sendAnswer = (uid, qid, answer) => dispatch => {
    var docRef = db.collection(qid).doc(uid);
    console.log(answer)

    docRef.set({
        answer: answer,
    }).then(function() {
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
    }).then(function() {
        console.log("Answer Check!");
        const check = true
        dispatch({ type: QUIZ_CHECK_EVENT, check })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// クイズ表示画面に正解をハイライトするActionCreator
export const quizCollectEvents = (id) => dispatch => {
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