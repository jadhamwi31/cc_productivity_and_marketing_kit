import { AxiosResponse } from 'axios';
import fileDownload from 'js-file-download';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { axios } from '../lib/axios';
import { EnVideoPlayback } from '../ts/enums/video.enums';
import { Transcript } from '../ts/types/video.types';

export interface IVideoPartition {
  start: number;
  end: number;
}

type TabHistory = Pick<IVideoTab, 'partitions'>;

export interface IVideoTab {
  videoUrl: string | null;
  videoId: string | null;
  currentTime: number;
  duration: number;
  lineWidth: number;
  selectorStart: number;
  selectorEnd: number;
  isNew: boolean;
  partitions: IVideoPartition[];
  isCursorGrabbed: boolean;
  undo: TabHistory[];
  redo: TabHistory[];
  uploadProgress: number | null;
  downloading: boolean;
  buffer: ArrayBuffer | null;
  transcribing: boolean;
  transcript: Transcript | null;
  transcriptsUsed: string[];
}

interface IVideosStore {
  tabs: { [tabId: string]: IVideoTab };
  addTab: () => void;
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
  uploadFile: (file: File) => Promise<void>;
  playback: EnVideoPlayback;
  setPlayback: (playback: EnVideoPlayback) => void;
  cut: () => Promise<void>;
  updateTab: (values: Partial<IVideoTab>) => void;
  undo: () => void;
  redo: () => void;
  downloadVideo: () => void;
  transcribe: () => void;
  deleteTab: (id: string) => void;
  cutFromTo: (from: number, to: number) => void;
  uncutFromTo: (from: number, to: number) => void;
}

const INITIAL_TAB_ID = uuid();

const DEFAULT_TAB_VALUES: IVideoTab = {
  videoUrl: null,
  videoId: null,
  currentTime: 0,
  selectorStart: 0,
  selectorEnd: 0,
  duration: 0,
  lineWidth: 0,
  transcribing: false,
  isNew: false,
  partitions: [],
  isCursorGrabbed: false,
  undo: [{ partitions: [] }],
  redo: [{ partitions: [] }],
  uploadProgress: null,
  downloading: false,
  buffer: null,
  transcriptsUsed: [],
  transcript: {
    text: "! If you want to be a competent developer you need to work on projects but not just any projects ones that actually give you the skills that make you stand out as a developer that's why in this video i'll share with you three types of projects that are guaranteed to make you a programmer now the first type of project that you need to build is something that you have no idea how to build that's right you need to pick an idea that seems so incredibly difficult! so far out there so foreign to you something that you genuinely dont even know how to begin im talking about projects where you might not even know the programming language youre going to use you dont know the framework you dont know the ide youll be using what operating system its going to run on something that is so foreign and so out there where you genuinely have to start right from the beginning pretty much as a beginner now the nice thing is you still have your programming knowledge and a lot of what you know is going to carry over into that project however! when you start a project you have no idea how to build you have to learn a ton and you have to figure out how to learn as efficiently as possible so right when you learn something you can apply it into the project i find the times i learn the fastest and the best are where i have something i need to build and i don't know how to do it that forces me to be resourceful go out there learn a new skill and pick up only the information i actually need to immediately apply it in the! project if you want to be a competent developer you need to work on projects but not just any projects ones that actually give you the skills that make you stand out as a developer that's why in this video i'll share with you three types of projects that are guaranteed to make you a programmer now the first type of project that you need to build is something that you have no idea how to build that's right you need to pick an idea that seems so incredibly difficult so far! out there so foreign to you something that you genuinely dont even know how to begin im talking about projects where you might not even know the programming language youre going to use you dont know the framework you dont know the ide youll be using what operating system its going to run on something that is so foreign and so out there where you genuinely have to start right from the beginning pretty much as a beginner now the nice thing is you still have your programming knowledge and a lot of what you know is going to carry over into that project however when you start a project you have no idea how to build you have! have to learn a ton and you have to figure out how to learn as efficiently as possible so right when you learn something you can apply it into the project i find the times i learn the fastest and the best are where i have something i need to build and i dont know how to do it that forces me to be resourceful go out there learn a new skill and pick up only the information i actually need to immediately apply it in the project i was going to write it so i ended up learning swift! learning X code, building a UI, learning all of the intricacies of iOS development. And in about a month I was able to make this app. Now this was really the first time in my life that I gained that confidence to feel like, Hey, I just went from having no experience how to do this to building a full fledged iOS app in about a month. What does that mean I can do in the future? That means I can learn any language. That means I can learn any framework and it really made me feel like much more of a programmer and not just a python developer. So I encourage you to build! similar things like that, especially if they help you in your real world life. Those are some of the best projects where again, you constantly have to find exactly the information you need. Apply that immediately and continue that process until you finish the project. Now the second project you need to build if you want to be a programmer is something that has real users. Now this doesn't need to be millions of users or hundreds of thousands of users or even tens of users. It can be two users. It can be three users.! It could be your mom. It could be your brother. It could be you who's using the application, but it's so important to actually build something that's used by real people. That's because people interact with an application a lot different than you think and oftentimes it's very difficult to actually imagine how someone's going to use the code that you've written and it makes you think about things in a very different perspective when you have real people using your application giving you feedback you need to think about things in a very different way.! First of all is what i'm building actually helping the user is it just cool for me or is it something that's actually going to be useful and worth their time second of all how easy is it for the user to use this feature can they understand it is it intuitive do they need instructions it just gives you a very different mindset on things and of course is you to be almost a product manager while an engineer at the same time which i think is a really valuable skill at the same time you! need ways to track your users analytics you need to figure out if bugs are occurring or errors are occurring you need way to capture feedback and you need to design with the user in mind so i would encourage you pick some type of application that real people are actually going to use i'll give you an example of one that i made my friends and i would constantly complain about who was on ox ox meaning controlling the music and all of my friends pretty much used spotify so i actually coded a solution that was going to be used by about five or ten of us where what we could do! was go on to some kind of app we could see the current spotify song that was playing and then we could vote to skip that song or vote to add a new song to the queue i essentially tried to design a collaborative kind of music playing system so that we no longer had to have these arguments about who is going to be controlling the music at a party event when we are playing cards whatever now i actually put this project on youtube you guys can go and check it out if you want to see that anyways this was a real world app where i learned a ton and i had to constantly communicate! with the users of the app and see if they were actually getting the value i intended them to get there was a lot of changes i needed to make a lot of things i needed to add and it really made me think about development in a different way that's why i encourage you to build an app that has real users now the last type of project you need to build to really become a great developer is something with a team or a partner you need to go outside of your solopreneur or solo developer mindset! and realize how you can actually develop with someone else or with a team of people. Now this will change a lot of things especially if you've never done this before because immediately your code quality now is going to be put into question other people are going to be reading and working with your code people are going to be looking at your pull requests your commit messages and it makes you think about things in a very different way all of a sudden it's not just for you it's for other people as well and you need to learn how to collaborate how to delegate how to make! sure multiple people aren't working on the same tasks how to deal with conflicts how to use git properly or version control software and that's exactly why in my course we encourage you to collaborate with people through our discord server in our community and we have all kinds of lessons and resources related to git and also just software engineering tools and kind of best practices that you don't stand out as a complete beginner when it comes to collaborative work anyways i encourage you find someone that you can work with now you can do this with a friend if you know other people! that are into development you could do this with someone from like a discord group so whether that be my course or my free discord server you guys can check that out people are always looking for other people to work on projects with and even if you join an open source project that's good too the point is you need to get experience working with other developers see how that works the communication channels and you'll realize that a lot of what you're doing on a day to day basis isn't just development it's actually collaboration and it really changes the way in which you do! things so to summarize you need to work on a project that you have no idea how to build one that has real users and one that involves collaboration with real people whether that be a team or a partner if you do all of that i guarantee you you will massively improve as a programmer and you will see a huge confidence boost in yourself and the quality of work you can deliver if you guys enjoyed this video make sure to leave a like subscribe to the channel and i will see you in the next one! was going to write it so i ended up learning swift learning xcode building a ui learning all of the intricacies of ios development and in about a month i was able to make this app now this was really the first time in my life that i gained that confidence to feel like hey i just went from having no experience how to do this to building a fullfledged ios app in about a month what does that mean i can do in the future that means i can learn any language that means i can learn any framework and it really made me feel like much more! of a programmer and not just a python developer. So I encourage you to build similar things like that especially if they help you in your real world life those are some of the best projects where again you constantly have to find exactly the information you need apply that immediately and continue that process until you finish the project. Now the second project you need to build if you want to be a programmer is something that has! real users now this doesn't need to be millions of users or hundreds of thousands of users or even tens of users it can be two users it can be three users it can be your mom it can be your brother it could be you who's using the application but it's so important to actually build something that's used by real people that's because people interact with an application a lot different than you think and oftentimes it's very difficult to actually imagine how someone's going to use the code that you've written and it makes you think about things in a very different perspective when you have! real people using your application giving you feedback you need to think about things in a very different way first of all is what i'm building actually helping the user is it just cool for me or is it something that's actually going to be useful and worth their time second of all how easy is it for the user to use this feature can they understand it is it intuitive do they need instructions it just gives you a very different mindset on things and it forces you to be almost a product manager while an engineer at the same time which i think is a really valuable! skill at the same time you need ways to track your users analytics you need to figure out if bugs are occurring or errors are occurring you need way to capture feedback and you need to design with the user in mind so i would encourage you pick some type of application that real people are actually going to use i'll give you an example of one that i made my friends and i would constantly complain about who was on ox ox meaning controlling the music and all of my friends pretty much used! Spotify so i actually coded a solution that was going to be used by about five or ten of us where what we could do is go onto some kind of app we could see the current Spotify song that was playing and then we could vote to skip that song or vote to add a new song to the queue i essentially tried to design a collaborative kind of music playing system so we no longer had to have these arguments about who is going to be controlling the music at a party event when we are playing cards whatever now i actually put this project on youtube you guys can go and check it out if you! want to see that anyways this was a real world app where i learned a ton and i had to constantly communicate with the users of the app and see if they were actually getting the value i intended them to get there was a lot of changes i needed to make a lot of things i needed to add and it really made me think about development in a different way that's why i encourage you to build an app that has real users now the last type of project you need to build to really become a! great developer is something with a team or a partner you need to go outside of your solo printer or solo developer mindset and realize how you can actually develop with someone else or with a team of people now this will change a lot of things especially if you've never done this before because immediately your code quality now is going to be put into question other people are going to be reading and working with your code people are going to be looking at your pull requests your commit messages and it makes you think about things in a very different way all! of a sudden it s not just for you it s for other people as well and you need to learn how to collaborate how to delegate how to make sure multiple people aren t working on the same tasks how to deal with conflicts how to use git properly or version control software and that s exactly why in my course we encourage you to collaborate with people through our discord server in our community and we have all kinds of lessons and resources related to git and also just software engineering tools and kind of best practices that you don t stand out as a complete! beginner when it comes to collaborative work anyways i encourage you find someone that you can work with now you can do this with a friend if you know other people that are into development you could do this with someone from like a discord group so whether that be my course or my free discord server you guys can check that out people are always looking for other people to work on projects with and even if you join an open source project that's good too the point is you need to get experience working with other developers see how that works the communication channels and! youll realize that a lot of what youre doing on a day to day basis isnt just development its actually collaboration and it really changes the way in which you do things so to summarize you need to work on a project that you have no idea how to build one that has real users and one that involves collaboration with real people whether that be a team or a partner if you do all of that i guarantee you will massively improve as a programmer and you will see a huge confidence boost in yourself and the quality of work you can deliver if you guys enjoyed this video make sure to leave a like subscribe to the channel! Thanks for watching!",
    chunks: [
      {
        timestamp: [0, 5.2],
        text: '! If you want to be a competent developer you need to work on projects but not just any projects',
      },
      {
        timestamp: [5.2, 9.52],
        text: ' ones that actually give you the skills that make you stand out as a developer',
      },
      {
        timestamp: [9.52, 15.6],
        text: " that's why in this video i'll share with you three types of projects that are guaranteed to make you a programmer",
      },
      {
        timestamp: [19.28, 24.56],
        text: ' now the first type of project that you need to build is something that you have no idea how to build',
      },
      {
        timestamp: [24.56, 28.32],
        text: " that's right you need to pick an idea that seems so incredibly difficult",
      },
      {
        timestamp: [0, 4.64],
        text: '! so far out there so foreign to you something that you genuinely dont even know how to begin',
      },
      {
        timestamp: [4.64, 8.56],
        text: ' im talking about projects where you might not even know the programming language youre going to use',
      },
      {
        timestamp: [8.56, 12.64],
        text: ' you dont know the framework you dont know the ide youll be using what operating system its going',
      },
      {
        timestamp: [12.64, 17.28],
        text: ' to run on something that is so foreign and so out there where you genuinely have to start',
      },
      {
        timestamp: [17.28, 21.84],
        text: ' right from the beginning pretty much as a beginner now the nice thing is you still have your',
      },
      {
        timestamp: [21.84, 26.56],
        text: ' programming knowledge and a lot of what you know is going to carry over into that project however',
      },
      {
        timestamp: [0, 4.8],
        text: '! when you start a project you have no idea how to build you have to learn a ton and you have to',
      },
      {
        timestamp: [4.8, 9.68],
        text: ' figure out how to learn as efficiently as possible so right when you learn something you can apply',
      },
      {
        timestamp: [9.68, 15.2],
        text: ' it into the project i find the times i learn the fastest and the best are where i have something i',
      },
      {
        timestamp: [15.2, 20.88],
        text: " need to build and i don't know how to do it that forces me to be resourceful go out there learn a",
      },
      {
        timestamp: [20.88, 25.36],
        text: ' new skill and pick up only the information i actually need to immediately apply it in the',
      },
      {
        timestamp: [0, 4.96],
        text: '! project if you want to be a competent developer you need to work on projects but not just any',
      },
      {
        timestamp: [4.96, 10.24],
        text: " projects ones that actually give you the skills that make you stand out as a developer that's",
      },
      {
        timestamp: [10.24, 15.36],
        text: " why in this video i'll share with you three types of projects that are guaranteed to make you a",
      },
      {
        timestamp: [15.36, 24.08],
        text: ' programmer now the first type of project that you need to build is something that you have no idea',
      },
      {
        timestamp: [24.08, 29.28],
        text: " how to build that's right you need to pick an idea that seems so incredibly difficult so far",
      },
      {
        timestamp: [0, 4.16],
        text: '! out there so foreign to you something that you genuinely dont even know how to begin',
      },
      {
        timestamp: [4.16, 7.52],
        text: ' im talking about projects where you might not even know the programming language youre',
      },
      {
        timestamp: [7.52, 11.52],
        text: ' going to use you dont know the framework you dont know the ide youll be using what operating',
      },
      {
        timestamp: [11.52, 15.44],
        text: ' system its going to run on something that is so foreign and so out there where you',
      },
      {
        timestamp: [15.44, 20.24],
        text: ' genuinely have to start right from the beginning pretty much as a beginner now the nice thing',
      },
      {
        timestamp: [20.24, 24.08],
        text: ' is you still have your programming knowledge and a lot of what you know is going to carry',
      },
      {
        timestamp: [24.08, 29.2],
        text: ' over into that project however when you start a project you have no idea how to build you have',
      },
      {
        timestamp: [0, 4.72],
        text: '! have to learn a ton and you have to figure out how to learn as efficiently as possible so right',
      },
      {
        timestamp: [4.72, 10.4],
        text: ' when you learn something you can apply it into the project i find the times i learn the fastest and',
      },
      {
        timestamp: [10.4, 15.12],
        text: ' the best are where i have something i need to build and i dont know how to do it that forces',
      },
      {
        timestamp: [15.12, 20.88],
        text: ' me to be resourceful go out there learn a new skill and pick up only the information i actually need',
      },
      {
        timestamp: [20.88, 25.28],
        text: ' to immediately apply it in the project i was going to write it so i ended up learning swift',
      },
      {
        timestamp: [0, 1],
        text: '! learning X code,',
      },
      {
        timestamp: [1.04, 2.4],
        text: ' building a UI, learning',
      },
      {
        timestamp: [2.44, 3.64],
        text: ' all of the intricacies of',
      },
      {
        timestamp: [3.68, 5.08],
        text: ' iOS development. And in',
      },
      {
        timestamp: [5.08, 6.08],
        text: ' about a month I was able',
      },
      {
        timestamp: [6.08, 7.24],
        text: ' to make this app. Now',
      },
      {
        timestamp: [7.24, 8],
        text: ' this was really the',
      },
      {
        timestamp: [8, 9.12],
        text: ' first time in my life',
      },
      {
        timestamp: [9.12, 10.04],
        text: ' that I gained that',
      },
      {
        timestamp: [10.04, 11.08],
        text: ' confidence to feel like,',
      },
      {
        timestamp: [11.08, 12.64],
        text: ' Hey, I just went from',
      },
      {
        timestamp: [12.64, 13.84],
        text: ' having no experience how',
      },
      {
        timestamp: [13.84, 14.8],
        text: ' to do this to building a',
      },
      {
        timestamp: [14.8, 16.44],
        text: ' full fledged iOS app in',
      },
      {
        timestamp: [16.44, 17.84],
        text: ' about a month. What does',
      },
      {
        timestamp: [17.84, 18.64],
        text: ' that mean I can do in',
      },
      {
        timestamp: [18.64, 19.64],
        text: ' the future? That means I',
      },
      {
        timestamp: [19.64, 20.6],
        text: ' can learn any language.',
      },
      {
        timestamp: [20.6, 21.32],
        text: ' That means I can learn',
      },
      {
        timestamp: [21.32, 22.48],
        text: ' any framework and it',
      },
      {
        timestamp: [22.48, 23.68],
        text: ' really made me feel like',
      },
      {
        timestamp: [23.68, 24.48],
        text: ' much more of a',
      },
      {
        timestamp: [24.48, 25.96],
        text: ' programmer and not just a',
      },
      {
        timestamp: [25.96, 27.56],
        text: ' python developer. So I',
      },
      {
        timestamp: [27.56, 28.64],
        text: ' encourage you to build',
      },
      {
        timestamp: [0, 1.22],
        text: '! similar things like that,',
      },
      {
        timestamp: [1.34, 3.78],
        text: ' especially if they help you in your real world life.',
      },
      {
        timestamp: [3.96, 5.94],
        text: ' Those are some of the best projects where again, you',
      },
      {
        timestamp: [5.94, 8.7],
        text: ' constantly have to find exactly the information you need.',
      },
      {
        timestamp: [8.9, 12.14],
        text: ' Apply that immediately and continue that process until',
      },
      {
        timestamp: [12.14, 13.3],
        text: ' you finish the project.',
      },
      {
        timestamp: [16.98, 19.66],
        text: ' Now the second project you need to build if you want to be a',
      },
      {
        timestamp: [19.66, 22.62],
        text: ' programmer is something that has real users.',
      },
      {
        timestamp: [22.86, 25.54],
        text: " Now this doesn't need to be millions of users or hundreds",
      },
      {
        timestamp: [25.54, 27.78],
        text: ' of thousands of users or even tens of users.',
      },
      {
        timestamp: [27.94, 28.86],
        text: ' It can be two users.',
      },
      {
        timestamp: [28.86, 29.7],
        text: ' It can be three users.',
      },
      {
        timestamp: [0, 0.8],
        text: '! It could be your mom.',
      },
      {
        timestamp: [0.8, 1.52],
        text: ' It could be your brother.',
      },
      {
        timestamp: [1.54, 5.2],
        text: " It could be you who's using the application, but it's so important to",
      },
      {
        timestamp: [5.2, 7.68],
        text: " actually build something that's used by real people.",
      },
      {
        timestamp: [8, 12.04],
        text: " That's because people interact with an application a lot different than you",
      },
      {
        timestamp: [12.04, 16.4],
        text: " think and oftentimes it's very difficult to actually imagine how someone's going",
      },
      {
        timestamp: [16.4, 19.68],
        text: " to use the code that you've written and it makes you think about things in a",
      },
      {
        timestamp: [19.68, 23.8],
        text: ' very different perspective when you have real people using your application',
      },
      {
        timestamp: [23.84, 27.28],
        text: ' giving you feedback you need to think about things in a very different way.',
      },
      {
        timestamp: [0, 5.04],
        text: "! First of all is what i'm building actually helping the user is it just cool for me or is it something",
      },
      {
        timestamp: [5.04, 10.4],
        text: " that's actually going to be useful and worth their time second of all how easy is it for the user to",
      },
      {
        timestamp: [10.4, 15.6],
        text: ' use this feature can they understand it is it intuitive do they need instructions it just gives',
      },
      {
        timestamp: [15.6, 20.16],
        text: ' you a very different mindset on things and of course is you to be almost a product manager',
      },
      {
        timestamp: [20.16, 25.52],
        text: ' while an engineer at the same time which i think is a really valuable skill at the same time you',
      },
      {
        timestamp: [0, 4.8],
        text: '! need ways to track your users analytics you need to figure out if bugs are occurring or errors are',
      },
      {
        timestamp: [4.8, 9.92],
        text: ' occurring you need way to capture feedback and you need to design with the user in mind so i would',
      },
      {
        timestamp: [9.92, 15.12],
        text: " encourage you pick some type of application that real people are actually going to use i'll give",
      },
      {
        timestamp: [15.12, 20.24],
        text: ' you an example of one that i made my friends and i would constantly complain about who was on ox',
      },
      {
        timestamp: [20.24, 25.28],
        text: ' ox meaning controlling the music and all of my friends pretty much used spotify so i actually',
      },
      {
        timestamp: [25.28, 29.2],
        text: ' coded a solution that was going to be used by about five or ten of us where what we could do',
      },
      {
        timestamp: [0, 4.24],
        text: '! was go on to some kind of app we could see the current spotify song that was playing and then',
      },
      {
        timestamp: [4.24, 9.2],
        text: ' we could vote to skip that song or vote to add a new song to the queue i essentially tried to',
      },
      {
        timestamp: [9.2, 13.6],
        text: ' design a collaborative kind of music playing system so that we no longer had to have these',
      },
      {
        timestamp: [13.6, 18.08],
        text: ' arguments about who is going to be controlling the music at a party event when we are playing cards',
      },
      {
        timestamp: [18.08, 22.32],
        text: ' whatever now i actually put this project on youtube you guys can go and check it out if you want to',
      },
      {
        timestamp: [22.32, 27.28],
        text: ' see that anyways this was a real world app where i learned a ton and i had to constantly communicate',
      },
      {
        timestamp: [0, 4.64],
        text: '! with the users of the app and see if they were actually getting the value i intended them to',
      },
      {
        timestamp: [4.64, 9.04],
        text: ' get there was a lot of changes i needed to make a lot of things i needed to add and it really made',
      },
      {
        timestamp: [9.04, 14.4],
        text: " me think about development in a different way that's why i encourage you to build an app that has real users",
      },
      {
        timestamp: [18.24, 23.68],
        text: ' now the last type of project you need to build to really become a great developer is something with',
      },
      {
        timestamp: [23.68, 29.44],
        text: ' a team or a partner you need to go outside of your solopreneur or solo developer mindset',
      },
      {
        timestamp: [0, 4.8],
        text: '! and realize how you can actually develop with someone else or with a team of people. Now this',
      },
      {
        timestamp: [4.8, 8.72],
        text: " will change a lot of things especially if you've never done this before because immediately your",
      },
      {
        timestamp: [8.72, 13.2],
        text: ' code quality now is going to be put into question other people are going to be reading and working',
      },
      {
        timestamp: [13.2, 17.52],
        text: ' with your code people are going to be looking at your pull requests your commit messages and it',
      },
      {
        timestamp: [17.52, 22.24],
        text: " makes you think about things in a very different way all of a sudden it's not just for you it's",
      },
      {
        timestamp: [22.24, 26.48],
        text: ' for other people as well and you need to learn how to collaborate how to delegate how to make',
      },
      {
        timestamp: [0, 4.8],
        text: "! sure multiple people aren't working on the same tasks how to deal with conflicts how to use git",
      },
      {
        timestamp: [4.8, 9.52],
        text: " properly or version control software and that's exactly why in my course we encourage you to",
      },
      {
        timestamp: [9.52, 14.16],
        text: ' collaborate with people through our discord server in our community and we have all kinds of lessons',
      },
      {
        timestamp: [14.16, 19.76],
        text: ' and resources related to git and also just software engineering tools and kind of best practices that',
      },
      {
        timestamp: [19.76, 24.72],
        text: " you don't stand out as a complete beginner when it comes to collaborative work anyways i encourage",
      },
      {
        timestamp: [24.72, 28.96],
        text: ' you find someone that you can work with now you can do this with a friend if you know other people',
      },
      {
        timestamp: [0, 3.92],
        text: '! that are into development you could do this with someone from like a discord group so whether',
      },
      {
        timestamp: [3.92, 8.88],
        text: ' that be my course or my free discord server you guys can check that out people are always looking',
      },
      {
        timestamp: [8.88, 13.52],
        text: " for other people to work on projects with and even if you join an open source project that's",
      },
      {
        timestamp: [13.52, 18.88],
        text: ' good too the point is you need to get experience working with other developers see how that works',
      },
      {
        timestamp: [18.88, 23.52],
        text: " the communication channels and you'll realize that a lot of what you're doing on a day to day basis",
      },
      {
        timestamp: [23.52, 28.16],
        text: " isn't just development it's actually collaboration and it really changes the way in which you do",
      },
      {
        timestamp: [0.02, 0],
        text: '! things so to summarize you need to work on a project that you have no idea how to build one that has real users and one that involves collaboration with real people whether that be a team or a partner if you do all of that i guarantee you you will massively improve as a programmer and you will see a huge confidence boost in yourself and the quality of work you can deliver if you guys enjoyed this video make sure to leave a like subscribe to the channel and i will see you in the next one!',
      },
      {
        timestamp: [6.48, 10.6],
        text: ' was going to write it so i ended up learning swift learning xcode building a ui learning all of the intricacies of ios development and in about a month i was able to make this',
      },
      {
        timestamp: [10.6, 14.74],
        text: ' app now this was really the first time in my life that i gained that confidence to',
      },
      {
        timestamp: [14.74, 19.64],
        text: ' feel like hey i just went from having no experience how to do this to building a fullfledged',
      },
      {
        timestamp: [19.64, 23.96],
        text: ' ios app in about a month what does that mean i can do in the future that means i can learn',
      },
      {
        timestamp: [23.96, 28.28],
        text: ' any language that means i can learn any framework and it really made me feel like much more',
      },
      {
        timestamp: [0, 5.2],
        text: '! of a programmer and not just a python developer. So I encourage you to build similar things like',
      },
      {
        timestamp: [5.2, 9.52],
        text: ' that especially if they help you in your real world life those are some of the best projects',
      },
      {
        timestamp: [9.52, 14.72],
        text: ' where again you constantly have to find exactly the information you need apply that immediately',
      },
      {
        timestamp: [14.72, 17.52],
        text: ' and continue that process until you finish the project.',
      },
      {
        timestamp: [21.2, 25.84],
        text: ' Now the second project you need to build if you want to be a programmer is something that has',
      },
      {
        timestamp: [0, 5.44],
        text: "! real users now this doesn't need to be millions of users or hundreds of thousands of users or even",
      },
      {
        timestamp: [5.44, 9.92],
        text: ' tens of users it can be two users it can be three users it can be your mom it can be your brother it',
      },
      {
        timestamp: [9.92, 14.64],
        text: " could be you who's using the application but it's so important to actually build something that's",
      },
      {
        timestamp: [14.64, 21.04],
        text: " used by real people that's because people interact with an application a lot different than you think",
      },
      {
        timestamp: [21.04, 25.52],
        text: " and oftentimes it's very difficult to actually imagine how someone's going to use the code that",
      },
      {
        timestamp: [25.52, 29.84],
        text: " you've written and it makes you think about things in a very different perspective when you have",
      },
      {
        timestamp: [0, 4.8],
        text: '! real people using your application giving you feedback you need to think about things in a',
      },
      {
        timestamp: [4.8, 9.68],
        text: " very different way first of all is what i'm building actually helping the user is it just",
      },
      {
        timestamp: [9.68, 14.08],
        text: " cool for me or is it something that's actually going to be useful and worth their time second",
      },
      {
        timestamp: [14.08, 19.52],
        text: ' of all how easy is it for the user to use this feature can they understand it is it intuitive do',
      },
      {
        timestamp: [19.52, 24.08],
        text: ' they need instructions it just gives you a very different mindset on things and it forces you to',
      },
      {
        timestamp: [24.08, 29.52],
        text: ' be almost a product manager while an engineer at the same time which i think is a really valuable',
      },
      {
        timestamp: [0, 5.36],
        text: '! skill at the same time you need ways to track your users analytics you need to figure out if bugs',
      },
      {
        timestamp: [5.36, 9.84],
        text: ' are occurring or errors are occurring you need way to capture feedback and you need to design with',
      },
      {
        timestamp: [9.84, 15.12],
        text: ' the user in mind so i would encourage you pick some type of application that real people are',
      },
      {
        timestamp: [15.12, 19.76],
        text: " actually going to use i'll give you an example of one that i made my friends and i would constantly",
      },
      {
        timestamp: [19.76, 25.52],
        text: ' complain about who was on ox ox meaning controlling the music and all of my friends pretty much used',
      },
      {
        timestamp: [0, 4.48],
        text: '! Spotify so i actually coded a solution that was going to be used by about five or ten of us',
      },
      {
        timestamp: [4.48, 8.8],
        text: ' where what we could do is go onto some kind of app we could see the current Spotify song that was',
      },
      {
        timestamp: [8.8, 14.16],
        text: ' playing and then we could vote to skip that song or vote to add a new song to the queue i essentially',
      },
      {
        timestamp: [14.16, 18.96],
        text: ' tried to design a collaborative kind of music playing system so we no longer had to have these',
      },
      {
        timestamp: [18.96, 23.44],
        text: ' arguments about who is going to be controlling the music at a party event when we are playing cards',
      },
      {
        timestamp: [23.44, 27.44],
        text: ' whatever now i actually put this project on youtube you guys can go and check it out if you',
      },
      {
        timestamp: [0, 4.56],
        text: '! want to see that anyways this was a real world app where i learned a ton and i had to constantly',
      },
      {
        timestamp: [4.56, 9.52],
        text: ' communicate with the users of the app and see if they were actually getting the value i intended',
      },
      {
        timestamp: [9.52, 13.68],
        text: ' them to get there was a lot of changes i needed to make a lot of things i needed to add and it',
      },
      {
        timestamp: [13.68, 17.6],
        text: " really made me think about development in a different way that's why i encourage you to",
      },
      {
        timestamp: [17.6, 26.88],
        text: ' build an app that has real users now the last type of project you need to build to really become a',
      },
      {
        timestamp: [0, 5.52],
        text: '! great developer is something with a team or a partner you need to go outside of your solo',
      },
      {
        timestamp: [5.52, 10.72],
        text: ' printer or solo developer mindset and realize how you can actually develop with someone else or',
      },
      {
        timestamp: [10.72, 14.8],
        text: " with a team of people now this will change a lot of things especially if you've never done this",
      },
      {
        timestamp: [14.8, 19.6],
        text: ' before because immediately your code quality now is going to be put into question other people are',
      },
      {
        timestamp: [19.6, 23.36],
        text: ' going to be reading and working with your code people are going to be looking at your pull',
      },
      {
        timestamp: [23.36, 28],
        text: ' requests your commit messages and it makes you think about things in a very different way all',
      },
      {
        timestamp: [0, 4.4],
        text: '! of a sudden it s not just for you it s for other people as well and you need to learn how to',
      },
      {
        timestamp: [4.4, 8.32],
        text: ' collaborate how to delegate how to make sure multiple people aren t working on the same',
      },
      {
        timestamp: [8.32, 13.36],
        text: ' tasks how to deal with conflicts how to use git properly or version control software and that s',
      },
      {
        timestamp: [13.36, 17.44],
        text: ' exactly why in my course we encourage you to collaborate with people through our discord',
      },
      {
        timestamp: [17.44, 22.4],
        text: ' server in our community and we have all kinds of lessons and resources related to git and also',
      },
      {
        timestamp: [22.4, 27.36],
        text: ' just software engineering tools and kind of best practices that you don t stand out as a complete',
      },
      {
        timestamp: [0, 5.04],
        text: '! beginner when it comes to collaborative work anyways i encourage you find someone that you',
      },
      {
        timestamp: [5.04, 9.2],
        text: ' can work with now you can do this with a friend if you know other people that are into development',
      },
      {
        timestamp: [9.2, 13.44],
        text: ' you could do this with someone from like a discord group so whether that be my course or my free',
      },
      {
        timestamp: [13.44, 17.92],
        text: ' discord server you guys can check that out people are always looking for other people to work on',
      },
      {
        timestamp: [17.92, 23.2],
        text: " projects with and even if you join an open source project that's good too the point is you need to",
      },
      {
        timestamp: [23.2, 28.32],
        text: ' get experience working with other developers see how that works the communication channels and',
      },
      {
        timestamp: [0, 4.24],
        text: '! youll realize that a lot of what youre doing on a day to day basis isnt just development',
      },
      {
        timestamp: [4.24, 8.12],
        text: ' its actually collaboration and it really changes the way in which you do things',
      },
      {
        timestamp: [8.12, 12.4],
        text: ' so to summarize you need to work on a project that you have no idea how to build one that',
      },
      {
        timestamp: [12.4, 17.4],
        text: ' has real users and one that involves collaboration with real people whether that be a team or',
      },
      {
        timestamp: [17.4, 22.4],
        text: ' a partner if you do all of that i guarantee you will massively improve as a programmer',
      },
      {
        timestamp: [22.4, 26.28],
        text: ' and you will see a huge confidence boost in yourself and the quality of work you can',
      },
      {
        timestamp: [26.28, 29.96],
        text: ' deliver if you guys enjoyed this video make sure to leave a like subscribe to the channel',
      },
      {
        timestamp: [0.02, 2.02],
        text: '! Thanks for watching!',
      },
    ],
  },
};

export const useVideosStore = create<IVideosStore>((set, get) => ({
  tabs: {
    [INITIAL_TAB_ID]: { ...DEFAULT_TAB_VALUES },
  },
  deleteTab(id) {
    const newTabs = { ...get().tabs };
    delete newTabs[id];
    set({ tabs: newTabs });
  },
  addTab: () => {
    const newTabs = { ...get().tabs };
    const tabId = uuid();

    newTabs[tabId] = { ...DEFAULT_TAB_VALUES };
    console.log(newTabs);

    set({ tabs: newTabs, selectedTab: tabId });
  },
  selectedTab: INITIAL_TAB_ID,
  setSelectedTab: (tabId) => {
    set({ selectedTab: tabId });
  },
  uploadFile: async (file) => {
    const formData = new FormData();

    const currentTab = get().selectedTab;
    formData.append('video', file);

    const newTabs = { ...get().tabs };

    const uploadToastId = toast('Uploading Progress : 0%', { progress: 0 });
    axios
      .post<void, AxiosResponse<string>>('/videos', formData, {
        onUploadProgress(progressEvent) {
          const newProgress = progressEvent.progress! * 100;

          if (newProgress === 100) {
            toast.update(uploadToastId, {
              render: `Video Uploaded`,
            });
            setTimeout(() => {
              toast.dismiss(uploadToastId);
            }, 2000);
          } else {
            toast.update(uploadToastId, {
              render: `Uploading Progress : ${newProgress}%`,
            });
          }
          newTabs[currentTab].uploadProgress = newProgress;
          set({ tabs: newTabs });
        },
      })
      .then(({ data }) => data)
      .then((videoId) => {
        newTabs[currentTab].videoId = videoId;

        set({ tabs: newTabs });
      });

    newTabs[currentTab].videoUrl = URL.createObjectURL(file);
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].isNew = true;
    newTabs[currentTab].buffer = await file.arrayBuffer();

    set({ tabs: newTabs });
  },
  cut: async () => {
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };
    const { selectorStart, selectorEnd } = newTabs[currentTab];
    const start = selectorStart > selectorEnd ? selectorEnd : selectorStart;
    const end = selectorStart < selectorEnd ? selectorEnd : selectorStart;
    const tab = newTabs[currentTab];
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].undo.push({ partitions: [...tab.partitions] });
    newTabs[currentTab].partitions = [
      ...newTabs[currentTab].partitions,
      { start: start + 1, end: end + 1 },
    ];
    set({ tabs: newTabs });
  },
  playback: EnVideoPlayback.PAUSED,
  setPlayback: (playback) => set({ playback }),
  updateTab: (values) => {
    const newTabs = { ...get().tabs };

    for (const [key, value] of Object.entries(values)) {
      _.update(newTabs, [get().selectedTab, key], () => value);
    }
    set({ tabs: newTabs });
  },
  undo: () => {
    const newTabs = { ...get().tabs };
    const currentTab = get().selectedTab;
    const tab = newTabs[currentTab];

    newTabs[currentTab].redo.push({ partitions: [...tab.partitions] });
    const newState = newTabs[currentTab].undo.pop();
    newTabs[currentTab] = { ...newTabs[currentTab], ...newState };
    set({ tabs: newTabs });
  },
  redo: () => {
    const newTabs = { ...get().tabs };
    const currentTab = get().selectedTab;
    const tab = newTabs[currentTab];

    const newUndo: TabHistory = { partitions: [...tab.partitions] };
    const undos = [...newTabs[currentTab].undo, newUndo];
    const newState = newTabs[currentTab].redo.pop();

    newTabs[currentTab] = { ...newTabs[currentTab], ...newState, undo: undos };
    set({ tabs: newTabs });
  },
  downloadVideo: () => {
    const tabs = { ...get().tabs };
    const currentTab = tabs[get().selectedTab];
    currentTab.downloading = true;
    set({ tabs });
    toast.promise(
      axios
        .post(`/videos/${currentTab.videoId}/export`, currentTab.partitions, {
          responseType: 'blob',
        })
        .then(({ data }) => {
          fileDownload(data, `${currentTab.videoId}.mp4`);
        })
        .finally(() => {
          currentTab.downloading = false;
          set({ tabs });
        }),
      {
        pending: `Exporting Video`,
        error: 'An Error Has Occured',
        success: `Video Exported`,
      },
    );
  },
  transcribe() {
    const tabs = { ...get().tabs };
    const currentTab = tabs[get().selectedTab];
    currentTab.transcribing = true;
    set({ tabs });
    axios
      .get(`/videos/${currentTab.videoId}/transcript`)
      .then(({ data }) => {
        currentTab.transcript = data;
        set({ tabs });
      })
      .finally(() => {
        currentTab.transcribing = false;
        set(tabs);
      });
  },
  cutFromTo(from, to) {
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };

    const tab = newTabs[currentTab];
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].undo.push({ partitions: [...tab.partitions] });
    newTabs[currentTab].partitions = [...newTabs[currentTab].partitions, { start: from, end: to }];
    set({ tabs: newTabs });
  },
  uncutFromTo(from, to) {
    const currentTab = get().selectedTab;
    const newTabs = { ...get().tabs };

    const tab = newTabs[currentTab];
    newTabs[currentTab].currentTime = 0;
    newTabs[currentTab].undo.push({ partitions: [...tab.partitions] });
    newTabs[currentTab].partitions = [...newTabs[currentTab].partitions].filter(
      (partition) => partition.start !== from && partition.end !== to,
    );
    set({ tabs: newTabs });
  },
}));

export const selectCurrentTab = (state: IVideosStore) => state.tabs[state.selectedTab];
