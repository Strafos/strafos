// Express server hosting API endpoints

const express = require("express");
const bodyParser = require("body-parser");

const db = require("./database");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

// Create new sprint
// search: createsprint
app.post("/sprint", (req, res) => {
  const { name, startDate, endDate } = req.body;
  const query = `INSERT INTO sprints values(null, (?), (?), (?), '')`;
  db.insert(query, [name, startDate, endDate])
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// Create new issue
// search: createissue
app.post("/issue", (req, res) => {
  const {
    sprintId,
    name,
    timeSpent,
    timeEstimate,
    timeRemaining,
    status,
    blocked,
    projectId,
    notes,
  } = req.body;
  const query =
    `INSERT INTO issues values(null, ` +
    `${sprintId}, '${name}', '${status}', ` +
    `${timeEstimate}, ${timeRemaining}, ` +
    `${projectId}, '${blocked}', ${timeSpent}, '${notes}', 0, 0)`;
  console.log(query);
  db.insert(query);
  res.send({ dbconn: "Success" });
});

// Get all sprints
// search: getsprints
app.get("/sprints", (req, res) => {
  const query = `SELECT * FROM sprints`;
  db.read(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

// Get issues of particular sprint
// search: getsprint
app.get("/Sprint/:id", (req, res) => {
  const query = `SELECT * FROM issues where sprint_id=${req.params.id}`;
  db.read(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

// Get specific issue
// search: getissue
app.get("/Issue/:id", (req, res) => {
  const query = `SELECT * FROM issues where id=${req.params.id}`;
  db.read(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

// Update issue status
// search: updatestatus
app.put("/issue/:id/status", (req, res) => {
  const { status } = req.body;
  const query = `UPDATE issues SET status='${status}' where id=${
    req.params.id
  }`;
  db.insert(query)
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// Update blocked
// search: updateblocked
app.put("/issue/:id/blocked", (req, res) => {
  const { blocked } = req.body;
  const query = `UPDATE issues SET blocked='${blocked}' where id=${
    req.params.id
  }`;
  db.insert(query)
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// Update shownotes
// search: updateshownotes
app.put("/issue/:id/showNotes", (req, res) => {
  const { bool } = req.body;
  const query = `UPDATE issues SET show_notes=${bool} where id=${
    req.params.id
  }`;
  db.insert(query)
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// Update issueTime
// search: updateIssueTime
app.put("/issue/:id/time", (req, res) => {
  const { stat, time } = req.body;
  const query = `UPDATE issues SET ${stat}=(?) where id=(?)`;
  db.insert(query, [time, req.params.id])
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// Create project
// search: createProject
app.post("/project", (req, res) => {
  const { name } = req.body;
  const query = `INSERT INTO projects values(null, (?))`;
  db.insert(query, [name])
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// Create timelog
// search: createTimelog
app.post("/log", (req, res) => {
  const { issueId, delta, stat, createdAt } = req.body;
  const query =
    `INSERT INTO timelog (issue_id, sprint_id, time_delta, time_stat, created_at) ` +
    `SELECT ${issueId}, i.sprint_id, ${delta}, '${stat}', '${createdAt}' ` +
    `FROM issues i ` +
    `WHERE i.id=${issueId}`;
  db.insert(query)
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// Create timelog
// search: createTimelog
app.get("/log/:id", (req, res) => {
  const query = `SELECT * FROM timelog where sprint_id=${req.params.id}`;
  db.read(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

// Get projects
// search: getprojects
app.get("/projects", (req, res) => {
  const query = `SELECT * FROM projects`;
  db.read(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

// updateNotes
app.put("/sprint/:id/notes", (req, res) => {
  const { notes } = req.body;
  const query = "UPDATE sprints SET notes=(?) where id=(?)";
  // const query = `UPDATE sprints SET notes='${notes}' where id=${req.params.id}`;
  console.log(query);
  db.insert(query, [notes, req.params.id])
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// updateissuenotes
app.put("/issue/:id/notes", (req, res) => {
  const { notes } = req.body;
  const query = "UPDATE issues SET notes=(?) where id=(?)";
  db.insert(query, [notes, req.params.id])
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// updateissue
app.put("/issue/:id", (req, res) => {
  const {
    name,
    sprintId,
    projectId,
    status,
    timeEstimate,
    timeRemaining,
    timeSpent,
    blocked,
    notes,
    bad,
  } = req.body;
  // const query =
  //   `UPDATE issues SET name='${name}', sprint_id=${sprintId}, project_id=${projectId}, ` +
  //   `status='${status}', time_estimate=${timeEstimate}, time_remaining=${timeRemaining}, ` +
  //   `time_spent=${timeSpent}, blocked='${blocked}', notes='${notes}', bad=${bad} ` +
  //   `where id=${req.params.id}`;
  const query =
    `UPDATE issues SET name=(?), sprint_id=(?), project_id=(?), ` +
    `status=(?), time_estimate=(?), time_remaining=(?), ` +
    `time_spent=(?), blocked=(?), notes=(?), bad=(?) ` +
    `where id=(?)`;
  console.log(query);
  db.insert(query, [
    name,
    sprintId,
    projectId,
    status,
    timeEstimate,
    timeRemaining,
    timeSpent,
    blocked,
    notes,
    bad,
    req.params.id,
  ])
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

// deleteissue
app.delete("/issue/:id", (req, res) => {
  const query = `DELETE FROM issues where id=${req.params.id}`;
  db.insert(query)
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

app.get("/recentIssues", (req, res) => {
  const query =
    "SELECT DISTINCT issue_id, name FROM recent_issues ORDER BY id DESC LIMIT 5";
  db.read(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/recentIssue/:id", (req, res) => {
  const { name } = req.body;
  const query = `INSERT INTO recent_issues VALUES(null, ${req.params.id}, (?))`;
  db.insert(query, [name])
    .then(() => {
      res.send({ status: "Success" });
    })
    .catch(err => {
      res.send({ status: "Failure" });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
