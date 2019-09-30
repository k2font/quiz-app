const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// 回答数を計算してfirestoreに格納するfunctions
exports.numAnswer = functions.region('asia-northeast1').firestore
  .document('state/quiz-state')
  .onWrite((change, context) => {
      const newValue = change.after.data();

      // この関数はオペレーション側がボタンクリックし続けている間も起動する(ドキュメントの値が更新されるから)
      // calcがtrueとなった場合 = 全員の回答が終了した状態の時にquiz_idを引っ張ってきて概要documentを参照。
      // その後、各documentのsizeをカウントしてquiz-stateに格納する(クイズ画面はonSnapshotをつないでいるため)

      if(newValue.calc === true) {
        var docRef = db.collection("state").doc("answer-state");
        const qid = newValue.quiz_id
        var answers = {
            "A": 0,
            "B": 0,
            "C": 0,
            "D": 0,
        }

        db.collection(qid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                var ans = doc.data()
                
                answers[doc.id] = ans.answer_user.length
                console.log(answers[doc.id])
            });

            console.log(answers)

            docRef.set({
                answers: answers,
            }, {merge: true});

            return "これは成功です!"
        }).catch((error) => {
            console.log("Error getting cached document:", error);
            return "これは失敗です...。"
        });
      }
  });