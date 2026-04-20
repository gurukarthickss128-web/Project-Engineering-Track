-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- =========================
-- PROJECTS TABLE
-- =========================
CREATE TABLE Projects (
    project_id INT PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

-- =========================
-- TASKS TABLE
-- =========================
CREATE TABLE Tasks (
    task_id INT PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    project_id INT,
    assigned_user_id INT,
    status VARCHAR(50) DEFAULT 'pending',

    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (assigned_user_id) REFERENCES Users(user_id)
);

-- =========================
-- USER_PROJECTS TABLE (MANY TO MANY)
-- =========================
CREATE TABLE UserProjects (
    user_id INT,
    project_id INT,

    PRIMARY KEY (user_id, project_id),

    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);