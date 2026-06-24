import { useState } from 'react'
import { submitBugReport } from './api'

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low']
const COMPONENTS = [
  'Authentication',
  'Dashboard',
  'Billing',
  'API',
  'Notifications',
  'Settings',
]

const EMPTY_FORM = {
  title: '',
  severity: '',
  component: '',
  description: '',
  steps: '',
  stepsCount: '',
}

export default function App() {
  const [form, setForm] = useState(EMPTY_FORM)

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)

  const [submitted, setSubmitted] = useState([])
  const [successId, setSuccessId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const validate = () => {
    const errs = {}

    if (!form.title.trim()) {
      errs.title = 'Bug title is required.'
    }

    if (!form.severity) {
      errs.severity = 'Please select a severity.'
    }

    if (!form.component) {
      errs.component = 'Please select a component.'
    }

    if (!form.description.trim()) {
      errs.description = 'Description is required.'
    }

    if (!form.stepsCount) {
      errs.stepsCount = 'Number of steps is required.'
    } else if (Number(form.stepsCount) <= 0) {
      errs.stepsCount = 'Steps count must be greater than 0.'
    }

    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSuccessId(null)
    setServerError(null)

    const errs = validate()

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      const result = await submitBugReport(form)

      setSuccessId(result.id)

      setSubmitted((prev) => [result, ...prev])

      setForm(EMPTY_FORM)
    } catch (err) {
      if (err.field) {
        setErrors({
          [err.field]: err.message,
        })
      } else {
        setServerError(
          err.message || 'Something went wrong.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const sevClass = (s) =>
    (
      {
        Critical: 'sev-critical',
        High: 'sev-high',
        Medium: 'sev-medium',
        Low: 'sev-low',
      }[s] ?? ''
    )

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="badge">
          ⬡ TrackFlow Internal Tools
        </div>

        <h1>Report a Bug</h1>

        <p>
          You're on the <strong>QA Engineering</strong>{' '}
          team at <strong>TrackFlow Inc.</strong> The
          team uses this form to log bugs before
          sprint planning every Monday.
        </p>
      </header>

      <div className="card">
        <p className="section-label">
          New Bug Report
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {successId && (
            <div
              style={{
                background:
                  'rgba(76,175,125,0.1)',
                border:
                  '1px solid rgba(76,175,125,0.3)',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 20,
                fontSize: 14,
                color: '#4caf7d',
              }}
            >
              ✓ Bug <strong>{successId}</strong>{' '}
              filed successfully!
            </div>
          )}

          {serverError && (
            <div
              style={{
                background:
                  'rgba(247,95,95,0.1)',
                border:
                  '1px solid rgba(247,95,95,0.3)',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 20,
                fontSize: 14,
                color: '#f75f5f',
              }}
            >
              {serverError}
            </div>
          )}

          <div className="form-group">
            <label>
              Bug Title <span className="req">*</span>
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Checkout button unresponsive on mobile Safari"
            />

            {errors.title && (
              <p
                style={{
                  color: '#f75f5f',
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                {errors.title}
              </p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Severity{' '}
                <span className="req">*</span>
              </label>

              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
              >
                <option value="">
                  — Select —
                </option>

                {SEVERITIES.map((s) => (
                  <option key={s}>
                    {s}
                  </option>
                ))}
              </select>

              {errors.severity && (
                <p
                  style={{
                    color: '#f75f5f',
                    fontSize: 12,
                    marginTop: 6,
                  }}
                >
                  {errors.severity}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>
                Affected Component{' '}
                <span className="req">*</span>
              </label>

              <select
                name="component"
                value={form.component}
                onChange={handleChange}
              >
                <option value="">
                  — Select —
                </option>

                {COMPONENTS.map((c) => (
                  <option key={c}>
                    {c}
                  </option>
                ))}
              </select>

              {errors.component && (
                <p
                  style={{
                    color: '#f75f5f',
                    fontSize: 12,
                    marginTop: 6,
                  }}
                >
                  {errors.component}
                </p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>
              Description{' '}
              <span className="req">*</span>
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what's happening and what the expected behaviour should be…"
            />

            {errors.description && (
              <p
                style={{
                  color: '#f75f5f',
                  fontSize: 12,
                  marginTop: 6,
                }}
              >
                {errors.description}
              </p>
            )}
          </div>

          <hr className="divider" />

          <div className="form-row">
            <div className="form-group">
              <label>
                Steps to Reproduce
              </label>

              <textarea
                name="steps"
                value={form.steps}
                onChange={handleChange}
                style={{ minHeight: 72 }}
                placeholder={
                  '1. Go to...\n2. Click...\n3. Observe...'
                }
              />
            </div>

            <div className="form-group">
              <label>
                No. of Steps{' '}
                <span className="req">*</span>
              </label>

              <input
                type="number"
                name="stepsCount"
                value={form.stepsCount}
                onChange={handleChange}
                min="1"
                placeholder="e.g. 3"
              />

              {errors.stepsCount && (
                <p
                  style={{
                    color: '#f75f5f',
                    fontSize: 12,
                    marginTop: 6,
                  }}
                >
                  {errors.stepsCount}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading
              ? 'Submitting...'
              : 'Submit Bug Report'}
          </button>
        </form>
      </div>

      {submitted.length > 0 && (
        <div className="submitted-list">
          <p
            className="section-label"
            style={{ marginBottom: 8 }}
          >
            Filed This Session
          </p>

          {submitted.map((bug, i) => (
            <div
              key={i}
              className="submitted-item"
            >
              <div>
                <div className="title">
                  {bug.title}
                </div>

                <div className="meta">
                  {bug.component} ·{' '}
                  {bug.stepsCount} steps
                </div>
              </div>

              <span
                className={`severity-badge ${sevClass(
                  bug.severity
                )}`}
              >
                {bug.severity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}