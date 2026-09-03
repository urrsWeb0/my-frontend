import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaClock, FaArrowLeft } from "react-icons/fa";
import { quizQuestions, assessments } from "../data/mockData";
import ConfirmDialog from "../components/ui/ConfirmDialog";

const QUIZ_SECONDS = 10 * 60; // 10 minute mock timer

export default function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Memoize questions so reference is stable
  const questions = useMemo(() => quizQuestions[id] || [], [id]);

  const meta = assessments.find((a) => String(a.id) === String(id));

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_SECONDS);
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);

  const submit = useCallback(() => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });
    navigate(`/assessments/${id}/result`, {
      state: { score, total: questions.length, answers, questions },
    });
  }, [answers, id, navigate, questions]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      submit();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, submit]);

  if (questions.length === 0) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">No quiz content is available for this assessment yet.</p>
        <Link to="/assessments" className="btn btn-outline-primary">Back to Assessments</Link>
      </div>
    );
  }

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="container py-4" style={{ maxWidth: 800 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/assessments" className="btn btn-link text-decoration-none ps-0">
          <FaArrowLeft className="me-1" /> Exit Quiz
        </Link>
        <div className={`d-flex align-items-center gap-2 fw-bold ${secondsLeft < 60 ? "text-danger" : "text-primary"}`}>
          <FaClock /> {mins}:{secs}
        </div>
      </div>

      <h5 className="fw-bold mb-1">{meta?.title || "Quiz"}</h5>
      <p className="text-muted small mb-3">
        Question {current + 1} of {questions.length} • {answeredCount} answered
      </p>

      <div className="progress mb-4" style={{ height: 6 }}>
        <div className="progress-bar" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="card p-4 mb-4">
        <h6 className="fw-semibold mb-4">{q.prompt}</h6>
        <div className="d-flex flex-column gap-2">
          {q.options.map((opt, i) => (
            <label
              key={i}
              className={`d-flex align-items-center gap-3 p-3 rounded-3 border ${answers[current] === i ? "border-primary bg-primary bg-opacity-10" : "border-light-subtle"}`}
              style={{ cursor: "pointer" }}
            >
              <input
                type="radio"
                name={`q-${current}`}
                className="form-check-input m-0"
                checked={answers[current] === i}
                onChange={() => setAnswers((prev) => ({ ...prev, [current]: i }))}
              />
              <span className="small">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Question navigator */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {questions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`btn btn-sm ${i === current ? "btn-primary" : answers[i] !== undefined ? "btn-outline-success" : "btn-outline-secondary"}`}
            style={{ width: 36 }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Previous
        </button>
        {current < questions.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setCurrent((c) => c + 1)}>
            Next
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => setConfirmingSubmit(true)}>
            Submit Quiz
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmingSubmit}
        title="Submit quiz?"
        message={
          answeredCount < questions.length
            ? `You've answered ${answeredCount} of ${questions.length} questions. Unanswered questions will be marked incorrect.`
            : "You've answered all questions. Ready to submit?"
        }
        confirmLabel="Submit"
        variant="success"
        onConfirm={submit}
        onCancel={() => setConfirmingSubmit(false)}
      />
    </div>
  );
}