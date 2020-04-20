var projectsJSON = [
    {
        "prev_image_path" : "assets/imgs/projectsPreview/ExpenseTrackerPrev.png",
        "title" : "Expense Tracker app",
        "description" : "Expense Tracker is one of my favorite application types. Thanks to my app I saved a lot of money. I always wanted to create my version of expence tracker so I did. This project has been desigen in REST architecture. On the backend side I used Python with framework Restful Flask. When I was planning app, I've decided to program frontend in vanilla JavaScript.",
        "livelink" : "#",
        "codelink" : "https://github.com/cezary-kania/ExpenseTracker"
    },
    {
        "prev_image_path" : "assets/imgs/projectsPreview/ExpenseTrackerPrev.png",
        "title" : "Expense Tracker app 2",
        "description" : "Expense Tracker is one of my favorite application types. Thanks to my app I saved a lot of money. I always wanted to create my version of expence tracker so I did. This project has been desigen in REST architecture. On the backend side I used Python with framework Restful Flask. When I was planning app, I've decided to program frontend in vanilla JavaScript.",
        "livelink" : "",
        "codelink" : "https://github.com/cezary-kania/ExpenseTracker"
    },
    {
        "id": "0",
        "prev_image_path" : "assets/imgs/projectsPreview/ExpenseTrackerPrev.png",
        "title" : "Expense Tracker app 3",
        "description" : "Expense Tracker is one of my favorite application types. Thanks to my app I saved a lot of money. I always wanted to create my version of expence tracker so I did. This project has been desigen in REST architecture. On the backend side I used Python with framework Restful Flask. When I was planning app, I've decided to program frontend in vanilla JavaScript.",
        "livelink" : "",
        "codelink" : ""
    }
]
class Project {
    constructor(prev_image_path, title, description, livelink = null, codelink = null) {
        this.prev_image_path = prev_image_path;
        this.title = title;
        this.description = description;
        this.livelink = livelink;
        this.codelink = codelink;
    }
}
class ProjectsCarousel {
    projects= [];
    curr_displayed_proj = 0;
    constructor(projectsJSON) {
        projectsJSON.forEach(el => {
            const newProject = new Project(el.prev_image_path, el.title, el.description, el.livelink, el.codelink);
            this.projects.push(newProject);
        });
        if(this.projects.length > 0) this.Load_project(0);
        document.querySelector("#projectBtnNext").addEventListener('click', () => {
            this.Next_project();
        });
        document.querySelector("#projectBtnPrev").addEventListener('click',() => {
            this.Prev_project();
        });
    }
    Load_project(id) {
        const project = this.projects[id];
        // Updating dom
        document.querySelector("#projectImage").src = project.prev_image_path;
        document.querySelector("#projectTitle").textContent = project.title;
        document.querySelector("#projectDecription").textContent = project.description;
        if(project.livelink.length == 0)
        document.querySelector("#projectLiveLink").style.display = "none";
        else{
            document.querySelector("#projectLiveLink").style.display = "inline";
            document.querySelector("#projectLiveLink").href = project.livelink;
        }
            
        if(project.codelink.length == 0)
            document.querySelector("#projectCodeLink").style.display = "none";
        else {
            document.querySelector("#projectCodeLink").style.display = "inline";
            document.querySelector("#projectCodeLink").href = project.codelink;
        }
            
    }
    Next_project() {
        let projectID;
        this.curr_displayed_proj = projectID = (this.curr_displayed_proj == this.projects.length -1) ? 0 : ++this.curr_displayed_proj;
        this.Load_project(projectID);
    }
    Prev_project() {
        let projectID;
        this.curr_displayed_proj = projectID = (this.curr_displayed_proj == 0) ? this.projects.length - 1 : --this.curr_displayed_proj;
        this.Load_project(projectID);
    }
}
class VisitCounter {
    constructor() {
        window.addEventListener('load',()=> {
            this.ApplyVisit();
        });
    }
    ApplyVisit() {
        if (localStorage.getItem("lastvisitDate") !== null) {
            let prev_visit = parseInt(localStorage.getItem("lastvisitDate"));
            let time =  Date.now();
            let twoHours = 3600000;
            if(time - twoHours > prev_visit) {
                localStorage.setItem("lastvisitDate", time);
                this.SendNewVisitNotification();
            }
        }
        else {
            localStorage.setItem("lastvisitDate", Date.now());
            this.SendNewVisitNotification();
        }    
    }
    SendNewVisitNotification() {
        const XHR = new XMLHttpRequest();
        XHR.open("POST","http://127.0.0.1:1234/new_visit");
        XHR.send();
    }
}
class MessageSender {
    constructor() {
        const form = document.querySelector("#ContactForm");
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.SendMessage(form);
        });
    }
    SendMessage(form) {
        const XHR = new XMLHttpRequest();
        const formData = new FormData(form);
        XHR.addEventListener('error',()=> {
            alert( 'Oops! Something went wrong.' );
        });
        XHR.addEventListener('load',()=> {
            alert( 'Thanks for you message!' );
        });
        XHR.open("POST","http://127.0.0.1:1234/new_message");
        XHR.send(formData);
    }

}
const carousel = new ProjectsCarousel(projectsJSON);
const vCounter = new VisitCounter();
const msgSender = new MessageSender();
