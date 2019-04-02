from locust import HttpLocust, TaskSet

# def login(l):
#     l.client.post("/login", {"username":"ellen_key", "password":"education"})

# def logout(l):
#     l.client.post("/logout", {"username":"ellen_key", "password":"education"})

def index(l):
    l.client.get("/posts")

def profile(l):
    l.client.get("/@moritzz91")

class UserBehavior(TaskSet):
    tasks = {index: 2, profile: 1}

    def on_start(self):
        index(self)

    def on_stop(self):
        profile(self)

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000