const c=(e,l,r)=>{const t=window.open("","_blank");if(!t){alert("Please allow popups to download the PDF");return}const d=e.map(n=>`<tr>${r.map(a=>`<td>${n[a.key]||"-"}</td>`).join("")}</tr>`).join(""),o=`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${l}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #1a5c2e; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #1a5c2e; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <h1>${l}</h1>
      <table>
        <thead>
          <tr>${r.map(n=>`<th>${n.label}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${d}
        </tbody>
      </table>
      <div class="footer">
        Generated on ${new Date().toLocaleString()} | Medigo Healthcare
      </div>
      <script>
        window.onload = function() {
          window.print();
          window.close();
        }
      <\/script>
    </body>
    </html>
  `;t.document.write(o),t.document.close()},s=(e,l,r)=>{const t=window.open("","_blank");if(!t){alert("Please allow popups to download the Word document");return}const d=e.map(n=>`<tr>${r.map(a=>`<td>${n[a.key]||"-"}</td>`).join("")}</tr>`).join(""),o=`
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <title>${l}</title>
      <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #1a5c2e; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #1a5c2e; color: white; }
      </style>
    </head>
    <body>
      <h1>${l}</h1>
      <table>
        <thead>
          <tr>${r.map(n=>`<th>${n.label}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${d}
        </tbody>
      </table>
    </body>
    </html>
  `;t.document.write(o),t.document.close(),t.document.execCommand("SaveAs",!0,`${l}.doc`)},p=e=>{window.print()},h=(e,l)=>{if(!e||e.length===0){alert("No data to export");return}const r=Object.keys(e[0]),t=[r.join(","),...e.map(a=>r.map(i=>JSON.stringify(a[i]||"")).join(","))].join(`
`),d=new Blob([t],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a"),n=URL.createObjectURL(d);o.setAttribute("href",n),o.setAttribute("download",`${l}.csv`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)};export{s as a,h as b,c as e,p};
