// Thanks to Adrian Roselli for this really useful snippet https://adrianroselli.com/2017/11/a-responsive-accessible-table.html
// https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html
// https://adrianroselli.com/2018/05/functions-to-add-aria-to-tables-and-lists.html
function AddTableARIA() {
    try {
      var allTables = document.querySelectorAll("table");
      for (var i = 0; i < allTables.length; i++) {
        allTables[i].setAttribute("role", "table");
      }
      var allRowGroups = document.querySelectorAll("thead, tbody, tfoot");
      for (var i = 0; i < allRowGroups.length; i++) {
        allRowGroups[i].setAttribute("role", "rowgroup");
      }
      var allRows = document.querySelectorAll("tr");
      for (var i = 0; i < allRows.length; i++) {
        allRows[i].setAttribute("role", "row");
      }
      var allCells = document.querySelectorAll("td");
      for (var i = 0; i < allCells.length; i++) {
        allCells[i].setAttribute("role", "cell");
      }
      var allHeaders = document.querySelectorAll("th");
      for (var i = 0; i < allHeaders.length; i++) {
        allHeaders[i].setAttribute("role", "columnheader");
      }
      // this accounts for scoped row headers
      var allRowHeaders = document.querySelectorAll("th[scope=row]");
      for (var i = 0; i < allRowHeaders.length; i++) {
        allRowHeaders[i].setAttribute("role", "rowheader");
      }
      // caption role not needed as it is not a real role and
      // browsers do not dump their own role with display block
    } catch (e) {
      console.log("AddTableARIA(): " + e);
    }
  }
  
  AddTableARIA();
  
  const allRows = document.querySelectorAll("tbody > tr");
  const offcanvas = document.getElementById("offcanvas");
  
  function openAndPopulateAside() {
    
    if(offcanvas.classList.contains("offcanvas-active")) {
      return;
    }
    
    const row = window.event.target.closest("tr");
    const columns = Array.from(row.children);
  
    columns.forEach(function (child, i) {
      const id = `slot-${i + 1}`;
      document.getElementById(id).innerHTML = child.innerHTML;
    });
   
  
    offcanvas.classList.add("offcanvas-active");
      offcanvas.removeAttribute("aria-hidden",);
    offcanvas.querySelector("button").tabIndex = undefined;
    offcanvas.focus();
  }
  
  function closeOffcanvas() {
        offcanvas.setAttribute("aria-hidden", "true");
    offcanvas.classList.remove("offcanvas-active");
    offcanvas.querySelector("button").tabIndex = -1;
    document.getElementById("table-wrapper").focus();
  }
  
  allRows.forEach(function (row) {
    row.addEventListener("click", openAndPopulateAside);
  });
  
