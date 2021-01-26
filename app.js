const serverApi = "https://portfolio-backend2020.herokuapp.com";
var projectsJSON = [
    {
        "prev_image_path" : "assets/imgs/projectsPreview/ExpenseTrackerPrev.png",
        "title" : "Expense Tracker",
        "description" : "Expense Tracker is one of my favorite application types. Thanks to my app I saved a lot of money.\
         I always wanted to create my version of expence tracker so I did. This project has been desigen in REST architecture.\
         On the backend side I used Python with framework Restful Flask. When I was planning app, I've decided to program frontend in vanilla JavaScript.",
        "livelink" : "",
        "codelink" : "https://github.com/cezary-kania/ExpenseTracker"
    },
    {
        "prev_image_path" : "assets/imgs/projectsPreview/WitDrivePrev.png",
        "title" : "WitDrive",
        "description" : "The cloud storage application created with college teammates.App allows users to upload and share files with others.\
         My job was to design all frontend layouts, code it. I also programmed most of frontend functionalities like registration, \
         web token authentication, file uploading, sharring etc.",
        "livelink" : "https://wit-team.github.io/WitDrive-Frontend/",
        "codelink" : "https://github.com/WIT-team/WitDrive-Frontend"
    },
    {
        "prev_image_path" : "assets/imgs/projectsPreview/ImageProcessingApp.png",
        "title" : "Image proccesing app",
        "description" : "Image proccesing app is my college project. As a desktop app, it allows users to display and modify image histogram (to strech or equalize), \
        apply some of point, neighborhood and morphological operations. The special feature I still work on is object segmentation and instance counting. \
        Technologies I use: C#, WPF, EmguCV (OpenCV wrapper).",
        "livelink" : "",
        "codelink" : "https://github.com/cezary-kania/ImageProcessingApp"
    },
    {
        "prev_image_path" : "assets/imgs/projectsPreview/fileupload_backend.png",
        "title" : "File upload website",
        "description" : "Backend to application with simples flask templates. I treat it more as a prototype for future project I want to create.\
        Application allows users to share files to server. Server gets package of files and generate unique link. Second user who has this link, can download that package. \
        Link with files are deleted from server after time specified by user.",
        "livelink" : "",
        "codelink" : "https://github.com/cezary-kania/fileupload-website"
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
            let twoHours = 2*3600000;
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
        fetch(`${serverApi}/visits`, {
            method : "POST"
        })
        .catch(err => {
            console.log(err);
        })
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
        const msg = {
            "e-mail" : form.elements["e-mail"].value,
            "title" : form.elements["title"].value,
            "message" : form.elements["message"].value
        }
        fetch(`${serverApi}/message`, {
            method : "POST",
            headers : new Headers({'content-type':'application/json'}),
            body :  JSON.stringify(msg)
        })
        .then(result=> result.json())
        .then(result=> {
            console.log(result);
            alert('Thanks for you message!');
        })
        .catch(error => {
            alert( 'Oops! Something went wrong.' );
            console.log(error);
        })
    }
}
const carousel = new ProjectsCarousel(projectsJSON);
const vCounter = new VisitCounter();
const msgSender = new MessageSender();

// Hamburger toggle
const toggleCb = document.querySelector("#hamburgerSwitch");
const navList = document.querySelector("#pageNavigationList");
toggleCb.addEventListener('click', (e) => {
    const isChecked = e.target.checked;
    if(isChecked) navList.classList.add('transformNone');
    else navList.classList.remove('transformNone');
});