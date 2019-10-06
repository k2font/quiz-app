const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// 回答数を計算してfirestoreに格納するfunctions
exports.numAnswer = functions.region('asia-northeast1').firestore
  .document('state/quiz-state')
  .onWrite((change, context) => {
      const newValue = change.after.data();

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

  // 回答数を計算してfirestoreに格納するfunctions
exports.createRanking = functions.region('asia-northeast1').firestore
    .document('state/quiz-state')
    .onWrite((change, context) => {
        const newValue = change.after.data();

        if(newValue.collect === true) {
            var docRef = db.collection("state").doc("ranking-state");
            var docRef_users = db.collection("users");
            const qid = newValue.quiz_id
            const answer = newValue.answer
            var users = {}
            var ranking = []

            console.log(users)

            // あらかじめユーザ名をすべて取得しておく
            docRef_users.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    users[doc.id] = doc.data()
                });
                console.log(users);
                return "これは成功です!"
            }).catch((error) => {
                console.log(error)
                return "error"
            });

            // TODO: 実行順序に問題が発生
            // 全ユーザリスト取得してから、以下の処理を実施するようにする
            
            db.collection(qid).doc(answer).get().then((doc) => {
                var response = doc.data()
                console.log("Create Ranking: " + response.answer_user)

                // TODO: 取ってきたUIDを、usersのnicknameを参照して置き換える
                // 置き換えたら、配列の順序を考慮して別の配列に突っ込む(array.push()で配列に突っ込むことができる)
                // Write here...
                console.log(users); // 全ユーザリスト
                response.answer_user.forEach((value) => {
                    console.log(users[value])
                    var ranking_user = users[value]
                    ranking.push(ranking_user.nickname)
                });

                // 最後にdocRef.setする
                docRef.set({
                    ranking: ranking,
                });

                return "成功です!"
            }).catch((error) => {
                console.log("Error getting cached document:", error);
                return "失敗!"
            });
        }
});