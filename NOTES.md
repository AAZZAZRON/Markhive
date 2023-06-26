# Marchive / Markhive / Mark Hive / MarkTrack / BookMark
> Website for Storing Marks and Achievements

> All-in-one place for Marks, Achievements, and More!

General Premise: users create accounts, and have a space to store their marks and achievements. information would be kept private from other users and stuff. Also, site would offer some sort of categorizing functionality for more organization and a way to filter by keywords. 

By storing everything "as you go", it should be much easier to write uni apps :D

## Backend
- built in django
- mongodb atlas to store data???

### Models
#### **User**
Basic Information
- username
- password
- first name
- last name
- email
- profile picture
- bio
- current grade
#### Marks and Achievements

User creates tags for themselves, which they can add to each entry they create

each entry will automatically be tagged with their grade

(is there a better way maybe idk)

User's will have:
- marks (many to many)
- achievements (may to many)

### Mark_Entry
- name
- date (default today)
- description (opt [md compatible])
- id
- numerator
- denominator
- course (the course code)
- tags (tags will automatically include what grade they are in)
- is_public (boolean)


### Achievement_Entry
- name
- date (default today)
- description (opt [md compatible])
- id
- tags
- is_public (boolean)


### Course
- name
- code (eg. ICS3U)
- colour


### Tag
- name
- code
- colour


## Frontend
ReactJS front end with tailwindcss. 
- ask max how to throw login/logout from django to react

I want a dashboard with graphs on startup, which the user can customize (i.e. pick thich ones to show up sort of like the github pins). 
- maybe using panda or numpy ?? idk
- possibly like most recent achievements / pie graph for number of entries, bar graph for idk something :clown:

(this would be later dev)

/user/\<user> would show the dashboard for the user using public data that they want to show ig (this would also probably be at a later stage idt its necessary)

probably i would also want a json dump feature (will prolly have to ask jason or ken how to do)


### Other ideas
- connect to brightspace using API??? auto grade import :skull:

## PERT Plan
1. Set up Django models
2. Set up the admin interface
- I want it to separate everything by user
3. Figuring out how to make endpoints only accessible to my front end application
4. Hosting
