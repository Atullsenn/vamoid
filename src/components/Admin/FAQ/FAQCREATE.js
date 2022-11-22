import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { URL } from "../../../url/url";

const FAQCREATE = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [messages, setMessages] = useState([]);

  // Form validation
  const [questionsError, setQuestionsError] = useState("");
  const questionRegex = /^[a-zA-Z\s]{50,300}$/;
  const [messageError, setMessageError] = useState("");
  const messageRegex = /^[a-zA-Z\s]{100,1000}$/;

  const isEnabled = !questionsError && !messageError && questions != "" && messages != ""

  const submitForm = (res) => {
    // e.preventDefault();
    Axios.post(
      URL + "/createfaq",
      {
        questions: questions,
        messages: messages,
      },
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    )
      .then((res) => {
        // alert("data submitted successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("data not submitted");
      });

    if (res) {
      history.push("/app/faq");
    }
  };

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="application-detail-heading-area">
              <h2>Create FAQ</h2>
            </div>
            {/* <!-- <div class="send-notifications-btn-area">
                 <a href="#" class="send-notifications-btn">Send Notification</a>   
                </div> -->  */}
          </div>
          <div className="col-lg-12">
            <div className="contact-notification-detail-main-area">
              <form className="send-notifications-form-area">
                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text"
                    onError={questionsError}
                    class={`form-control field ${!questionsError ? 'is-valid' : 'is-invalid'}`}
                    onChange={(e) => {
                      setQuestions(e.target.value);
                      const isQuestionCorrect = questionRegex.test(e.target.value)
                      setQuestionsError(e.target.value != "" && !isQuestionCorrect)
                    }}
                    name="holdername"
                    placeholder="Enter Subject"
                    autofocus=""
                    required="true"
                    id="name"
                  />
                  <div className="invalid-feedback">
                    {questionsError ? 'Question should be minimum length 50 and maximum length is 300 character!' : ''}
                  </div>
                </div>
                <div class="form-group">
                  <label>Message</label>
                  <textarea
                    class={`form-control field ${!messageError ? 'is-valid' : 'is-invalid' }`}
                    onChange={(e) => {
                      setMessages(e.target.value);
                      const isMessageValid = messageRegex.test(e.target.value)
                      setMessageError(e.target.value != "" && !isMessageValid)
                    }}
                    placeholder="Enter Message"
                  ></textarea>
                  <div className="invalid-feedback">
                    {messageError ? 'Message should be minimum length 100 and maximum length is 1000 character!' : ''}
                  </div>
                </div>
                <div className="contact-form-submint-btn-area">
                  <button type="button" className="btn btn-danger" disabled={!isEnabled}
                    onClick={submitForm}
                   
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQCREATE;
