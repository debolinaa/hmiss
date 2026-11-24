/**
 * HMIS - Printable Document Templates
 * Renders high-fidelity clinical and billing documents with @media print support
 */

window.HMIS_PRINT = {
  // 1. Electronic Prescription (Rx)
  renderPrescription(rx, patient) {
    const medRows = (rx.medicines || []).map((m, idx) => `
      <tr>
        <td style="font-weight:600;">${idx + 1}. ${m.name}</td>
        <td>${m.dosage || '-'}</td>
        <td style="font-weight:600;color:#1e40af;">${m.frequency || '-'}</td>
        <td>${m.duration || '-'}</td>
        <td style="font-style:italic;color:#475569;">${m.instruction || '-'}</td>
      </tr>
    `).join('');

    const tests = (rx.investigationsOrdered && rx.investigationsOrdered.length > 0)
      ? `<div style="margin-top:1rem;background:#f8fafc;padding:0.75rem;border-radius:6px;border:1px solid #e2e8f0;">
          <strong style="color:#0f172a;font-size:0.85rem;">Investigations / Tests Advised:</strong>
          <ul style="margin:0.35rem 0 0 1.25rem;font-size:0.82rem;color:#334155;">
            ${rx.investigationsOrdered.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>`
      : '';

    return `
      <div class="document-paper" id="printable-rx">
        <div class="document-header">
          <div class="document-hospital-info">
            <h2>MEDICORE MULTISPECIALITY HOSPITAL</h2>
            <p>Affiliated to West Bengal University of Health Sciences (WBUHS)</p>
            <p>124 Health City Avenue, Salt Lake Sector V, Kolkata, WB - 700091</p>
            <p>Emergency Helpline: +91 33 2980 0000 | Web: www.medicore-hmis.edu</p>
          </div>
          <div class="document-badge">
            <div class="document-title">Outpatient Prescription</div>
            <div style="font-size:0.8rem;color:#64748b;margin-top:0.25rem;">Rx Ref: <strong>${rx.id}</strong></div>
            <div style="font-size:0.8rem;color:#64748b;">Date: <strong>${rx.date}</strong></div>
          </div>
        </div>

        <div class="document-meta-grid">
          <div class="document-meta-item">
            <span class="document-meta-label">Patient Name:</span>
            <span class="document-meta-value">${patient ? patient.name : rx.patientName}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Patient UID:</span>
            <span class="document-meta-value">${rx.patientUid}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Age / Gender:</span>
            <span class="document-meta-value">${patient ? `${patient.age} Yrs / ${patient.gender}` : 'N/A'}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Attending Doctor:</span>
            <span class="document-meta-value">${rx.doctorName}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Allergies:</span>
            <span class="document-meta-value" style="color:#dc2626;">${patient ? patient.allergies : 'None recorded'}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Diagnosis:</span>
            <span class="document-meta-value" style="color:#1e40af;">${rx.diagnosisName || 'General OPD Evaluation'}</span>
          </div>
        </div>

        <div class="rx-symbol">℞</div>

        <table class="rx-med-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            ${medRows}
          </tbody>
        </table>

        ${tests}

        ${rx.generalAdvice ? `
          <div style="margin-top:1rem;font-size:0.85rem;color:#334155;">
            <strong>Doctor's Advice / Lifestyle:</strong>
            <p style="margin-top:0.25rem;">${rx.generalAdvice}</p>
          </div>
        ` : ''}

        <div class="doctor-signature">
          <div class="signature-box">
            <div style="font-size:0.75rem;color:#10b981;font-weight:600;margin-bottom:0.25rem;">✓ Digitally Signed & Authenticated</div>
            <div class="signature-name">${rx.doctorName}</div>
            <div class="signature-title">${rx.digitalSignature || 'Consultant Physician'}</div>
            <div style="font-size:0.7rem;color:#94a3b8;margin-top:0.2rem;">Date & Time: ${rx.date}</div>
          </div>
        </div>
      </div>
    `;
  },

  // 2. Discharge Summary
  renderDischargeSummary(dc, patient) {
    const meds = (dc.dischargeMedications || []).map(m => `<li>${m}</li>`).join('');

    return `
      <div class="document-paper" id="printable-discharge">
        <div class="document-header">
          <div class="document-hospital-info">
            <h2>MEDICORE MULTISPECIALITY HOSPITAL</h2>
            <p>In-Patient Department (IPD) Clinical Records</p>
            <p>124 Health City Avenue, Salt Lake Sector V, Kolkata, WB - 700091</p>
          </div>
          <div class="document-badge">
            <div class="document-title" style="color:#0f766e;">Clinical Discharge Summary</div>
            <div style="font-size:0.8rem;color:#64748b;margin-top:0.25rem;">Summary ID: <strong>${dc.id}</strong></div>
          </div>
        </div>

        <div class="document-meta-grid">
          <div class="document-meta-item">
            <span class="document-meta-label">Patient Name:</span>
            <span class="document-meta-value">${dc.patientName}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Patient UID:</span>
            <span class="document-meta-value">${dc.patientUid}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Admission Date:</span>
            <span class="document-meta-value">${dc.admissionDate}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Discharge Date:</span>
            <span class="document-meta-value">${dc.dischargeDate}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Attending Doctor:</span>
            <span class="document-meta-value">${dc.attendingDoctor}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Age / Gender:</span>
            <span class="document-meta-value">${patient ? `${patient.age} Yrs / ${patient.gender}` : 'N/A'}</span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:1.25rem;font-size:0.85rem;line-height:1.6;">
          <div>
            <strong style="color:#0f172a;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.04em;">Diagnosis at Admission:</strong>
            <p style="color:#334155;margin-top:0.2rem;">${dc.diagnosisAtAdmission || 'Not specified'}</p>
          </div>

          <div>
            <strong style="color:#0f172a;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.04em;">Final Diagnosis:</strong>
            <p style="color:#1e40af;font-weight:700;margin-top:0.2rem;">${dc.finalDiagnosis}</p>
          </div>

          <div>
            <strong style="color:#0f172a;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.04em;">Brief Clinical Summary & Hospital Course:</strong>
            <p style="color:#334155;margin-top:0.2rem;">${dc.hospitalCourse}</p>
          </div>

          <div>
            <strong style="color:#0f172a;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.04em;">Condition at Discharge:</strong>
            <p style="color:#065f46;font-weight:600;margin-top:0.2rem;">${dc.conditionAtDischarge}</p>
          </div>

          <div>
            <strong style="color:#0f172a;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.04em;">Discharge Medications:</strong>
            <ul style="margin:0.35rem 0 0 1.25rem;color:#334155;">
              ${meds}
            </ul>
          </div>

          <div>
            <strong style="color:#0f172a;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.04em;">Diet & Follow-Up Advice:</strong>
            <p style="color:#334155;margin-top:0.2rem;"><strong>Diet:</strong> ${dc.dietInstructions}</p>
            <p style="color:#334155;margin-top:0.2rem;"><strong>Follow-up:</strong> ${dc.followUpInstructions}</p>
          </div>
        </div>

        <div class="doctor-signature">
          <div class="signature-box">
            <div class="signature-name">${dc.attendingDoctor}</div>
            <div class="signature-title">Attending Physician / Surgeon</div>
            <div style="font-size:0.7rem;color:#94a3b8;margin-top:0.2rem;">Department of Medicine</div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Official Hospital Invoice (Final or Duplicate)
  renderBill(bill, isDuplicate = false) {
    const itemRows = (bill.items || []).map((it, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td style="font-weight:600;color:#0f172a;">${it.description}</td>
        <td><span class="badge badge-neutral">${it.category || 'Service'}</span></td>
        <td style="text-align:right;font-weight:600;">₹ ${parseFloat(it.amount).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    return `
      <div class="document-paper" id="printable-bill" style="position:relative;">
        ${isDuplicate ? `
          <div class="duplicate-watermark">
            DUPLICATE INVOICE<br>
            <span style="font-size:1.1rem;letter-spacing:0.08em;color:#ef4444;font-weight:700;">REPRINT COPY • NO NEW FINANCIAL CHARGE</span>
          </div>
        ` : ''}

        <div class="document-header">
          <div class="document-hospital-info">
            <h2>MEDICORE MULTISPECIALITY HOSPITAL</h2>
            <p>Hospital Management & Information System (HMIS)</p>
            <p>GSTIN: 19AAACM1234F1Z5 | PAN: AAACM1234F</p>
            <p>124 Health City Avenue, Salt Lake Sector V, Kolkata, WB - 700091</p>
          </div>
          <div class="document-badge">
            <div class="document-title" style="color:${isDuplicate ? '#dc2626' : '#0f172a'};">
              ${isDuplicate ? 'DUPLICATE TAX INVOICE' : 'ORIGINAL TAX INVOICE'}
            </div>
            <div style="font-size:0.8rem;color:#64748b;margin-top:0.25rem;">Invoice No: <strong>${bill.billNumber}</strong></div>
            <div style="font-size:0.8rem;color:#64748b;">Date: <strong>${bill.date}</strong></div>
            ${isDuplicate ? `<div style="font-size:0.75rem;color:#dc2626;font-weight:700;">Reprint # ${bill.reprintCount || 1}</div>` : ''}
          </div>
        </div>

        <div class="document-meta-grid">
          <div class="document-meta-item">
            <span class="document-meta-label">Billed To:</span>
            <span class="document-meta-value">${bill.patientName}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Patient UID:</span>
            <span class="document-meta-value">${bill.patientUid}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Bill Category:</span>
            <span class="document-meta-value">${bill.billType}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Payment Status:</span>
            <span class="document-meta-value" style="color:${bill.paymentStatus === 'Paid' ? '#059669' : '#d97706'};font-weight:700;">
              ${bill.paymentStatus.toUpperCase()}
            </span>
          </div>
        </div>

        <table class="data-table" style="margin-bottom:1.5rem;">
          <thead>
            <tr>
              <th style="width:40px;">#</th>
              <th>Service / Item Description</th>
              <th style="width:120px;">Category</th>
              <th style="width:120px;text-align:right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:2rem;">
          <div style="font-size:0.78rem;color:#64748b;max-width:380px;">
            <p><strong>Payment Info:</strong> Method: ${bill.paymentMethod} | Txn Ref: ${bill.transactionRef}</p>
            <p style="margin-top:0.35rem;">Computer-generated tax invoice issued by MEDICORE HMIS. ${isDuplicate ? 'This is an exact duplicate copy for record verification. It does not reflect a new or additional financial liability.' : 'Subject to hospital billing policies.'}</p>
            <div style="margin-top:0.75rem;font-family:monospace;font-size:0.7rem;letter-spacing:0.1em;color:#94a3b8;">
              ||| ||||| |||| |||||| |||||||| ||||||| ${bill.billNumber}
            </div>
          </div>

          <div class="billing-summary-box">
            <div class="billing-row">
              <span>Sub-Total:</span>
              <span>₹ ${bill.subTotal.toLocaleString('en-IN')}</span>
            </div>
            ${bill.discount > 0 ? `
              <div class="billing-row" style="color:#059669;">
                <span>Discount Applied:</span>
                <span>- ₹ ${bill.discount.toLocaleString('en-IN')}</span>
              </div>
            ` : ''}
            <div class="billing-row">
              <span>GST (${bill.taxRate}%):</span>
              <span>+ ₹ ${bill.taxAmount.toLocaleString('en-IN')}</span>
            </div>
            <div class="billing-row total">
              <span>Grand Total:</span>
              <span>₹ ${bill.grandTotal.toLocaleString('en-IN')}</span>
            </div>
            ${bill.insuranceCovered > 0 ? `
              <div class="billing-row" style="color:#0284c7;font-size:0.8rem;">
                <span>Insurance Coverage:</span>
                <span>- ₹ ${bill.insuranceCovered.toLocaleString('en-IN')}</span>
              </div>
              <div class="billing-row" style="font-weight:700;">
                <span>Patient Payable:</span>
                <span>₹ ${bill.patientPayable.toLocaleString('en-IN')}</span>
              </div>
            ` : ''}
            <div class="billing-row paid">
              <span>Amount Paid:</span>
              <span>₹ ${bill.amountPaid.toLocaleString('en-IN')}</span>
            </div>
            <div class="billing-row balance">
              <span>Balance Due:</span>
              <span>₹ ${bill.balanceDue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div class="doctor-signature" style="margin-top:2.5rem;">
          <div class="signature-box">
            <div class="signature-name">Accounts & Billing Section</div>
            <div class="signature-title">Authorized Cashier / Officer</div>
            <div style="font-size:0.7rem;color:#94a3b8;margin-top:0.2rem;">MEDICORE HMIS Central Billing</div>
          </div>
        </div>
      </div>
    `;
  },

  // 4. Print modal helper
  openPrintModal(htmlContent, documentTitle = 'Document') {
    let container = document.getElementById('print-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'print-modal-container';
      container.className = 'modal-backdrop active';
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <div class="modal-dialog modal-lg" style="max-width:900px;">
        <div class="modal-header">
          <div class="modal-title">${documentTitle}</div>
          <div style="display:flex;gap:0.5rem;align-items:center;">
            <button class="btn btn-primary btn-sm" onclick="window.print()">
              🖨️ Print / Save as PDF
            </button>
            <button class="modal-close-btn" onclick="document.getElementById('print-modal-container').classList.remove('active')">✕</button>
          </div>
        </div>
        <div class="modal-body" style="background:#f1f5f9;padding:1.5rem;">
          ${htmlContent}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('print-modal-container').classList.remove('active')">Close</button>
          <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print Document</button>
        </div>
      </div>
    `;

    container.classList.add('active');
  }
};
