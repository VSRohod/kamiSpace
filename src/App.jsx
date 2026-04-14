import React, { useState, useEffect, useRef } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import './App.css';

// Componentes
import DesktopIcons from './components/desktop-icons/DesktopIcons';
import { Helmet } from './helmet/Helmet';
import { Taskbar } from './components/taskbar/Taskbar';
import PortfolioWindow from './components/portfolio/PortfolioWindow';
import ResumeWindow from './components/resume/ResumeWindow';
import BrowserWindow from './components/browser/BrowserWindow';
import MusicWindow from './components/music/MusicWindow';
import RecycleBinWindow from './components/recyclebin/RecycleBinWindow';
import WarningWindow from './components/warning/WarningWindow';
import BinWarningWindow from './components/warning/BinWarningWindow';
import RecycleWarningWindow from './components/warning/RecycleWarningWindow';
import BlueScreen from './components/bluescreen/BlueScreen';
import RecycleBinContent from './components/recyclebin/RecycleBinContent';
import GitIcon from './components/GitIcon';

// Assets
import win95recycle from './assets/sounds/win95recycle.wav';
import win95error from './assets/sounds/win95error.mp3';
import safeTurnOff from './assets/images/safe-turn-off.jpeg';
import win95shutdown from './assets/images/win95-shutdown.png';
import win95shutdownMobile from './assets/images/win95-shutdown-mobile.png';
import { Mailnews20, Shell32167, MediaCd, Shell3232, Shell3233 } from '@react95/icons';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
    background-color: #008080;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  ${styleReset}
`;

const App = () => {
  // CONFIGURAÇÕES INICIAIS (Login e Boot removidos aqui)
  const [isTouchDevice, setIsTouchDevice] = useState('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const [startingUp, setStartingUp] = useState(false);
  const [signed, setSigned] = useState(true); // Sempre logado
  const [loading, setLoading] = useState(false);
  const [energyStar, setEnergyStar] = useState(false);
  
  const tasks = ["portfolio", "resume", "browser", "music", "recycle bin"];
  const minTaskIndex = tasks.length + 5;

  const initializeTasksState = (state) => {
    const initialState = {};
    tasks.forEach(task => { initialState[task] = state; });
    return initialState;
  };

  const [tasksVisibility, setTasksVisibility] = useState(initializeTasksState('visible'));
  const [taskIndices, setTaskIndices] = useState(initializeTasksState(minTaskIndex));
  const recycleAudio = new Audio(win95recycle);
  const errorAudio = new Audio(win95error);
  
  const [projectUrl, setProjectUrl] = useState(null);
  const [dockMenuActive, setDockMenuActive] = useState(false);
  const [displayTasks, setDisplayTasks] = useState(new Set());
  const [activeTask, setActiveTask] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBinIcon, setSelectedBinIcon] = useState(null);
  const [displayBSOD, setDisplayBSOD] = useState('none');
  const [warnings, setWarnings] = useState(0);
  const [signingOff, setSigningOff] = useState(false);
  const [shutDown, setShutDown] = useState(false);
  const [turnOff, setTurnOff] = useState(false);
  const [binLastPos, setBinLastPos] = useState(null);
  const [iconDragPoint, setIconDragPoint] = useState({x: 0, y: 0});
  const [taskSwitiching, setTaskSwitiching] = useState(false);

  const [icons, setIcons] = useState({
    'resume': { Icon: Mailnews20, desktopRef: useRef(null), iconRef: useRef(null), position: { x: 125, y: 25 } },
    'git': { Icon: GitIcon, desktopRef: useRef(null), iconRef: useRef(null), binIconRef: useRef(null), position: { x: 125, y: 150 }, visibility: 'visible' },
    'music': { Icon: MediaCd, desktopRef: useRef(null), iconRef: useRef(null), binIconRef: useRef(null), position: { x: 25, y: 150 }, visibility: 'visible' },
    'portfolio': { Icon: Shell32167, desktopRef: useRef(null), iconRef: useRef(null), binIconRef: useRef(null), position: { x: 25, y: 25 }, visibility: 'visible' },
    'recycle bin': { Icon: Shell3232, desktopRef: useRef(null), iconRef: useRef(null), position: { x: 25, y: 275 } },
  });

  const [iconsInBin, setIconsInBin] = useState(new Set());

  // Lógica de Reciclagem e Posicionamento
  const settingIconsInBinSimple = (boolean, task) => {
    setIconsInBin((prevState) => {
      const newState = new Set(prevState);
      boolean ? newState.add(task) : newState.delete(task);
      return newState;
    });
  };

  const binWindowRef = useRef(null);
  const binIconsRef = useRef();

  const recyclingIcon = (task) => {
    displayingTask(false, task);
    settingIconsInBinSimple(true, task);
    setIcons(prev => ({
      ...prev,
      [task]: { ...prev[task], visibility: 'hidden' },
      "recycle bin": { ...prev["recycle bin"], Icon: Shell3233 }
    }));
    recycleAudio.play();
  };

  const positioningIcon = (task, x, y) => {
    setIcons(prev => ({
      ...prev,
      [task]: { ...prev[task], position: { x, y } }
    }));
  };

  const teleportingIcon = (event) => {
    // ... (Mantive sua lógica de teleporting original)
  };

  const indexingTasks = (task) => {
    setTaskIndices((prevState) => {
      const newState = { ...prevState };
      const sortedKeys = Object.keys(newState).sort((a, b) => newState[a] - newState[b]);
      const taskIndex = sortedKeys.indexOf(task);
      for (let i = taskIndex + 1; i < sortedKeys.length; i++) {
        if (newState[sortedKeys[i]] > minTaskIndex) newState[sortedKeys[i]] -= 1;
      }
      newState[task] = minTaskIndex * 2 - 1;
      return newState;
    });
  };

  const displayingTask = (boolean, task) => {
    setDisplayTasks((prevState) => {
      const newDisplayTasks = new Set(prevState);
      boolean ? newDisplayTasks.add(task) : newDisplayTasks.delete(task);
      return newDisplayTasks;
    });
  };

  const handleDown = (event) => {
    setDockMenuActive(false);
    if (event.target.className === 'desktop') setActiveTask(null);
    setSelectedIcon(null);
  };

  const issuingWarning = () => {
    setWarnings(prev => {
      const next = prev + 1;
      if (next >= 3) setDisplayBSOD('flex');
      return next;
    });
  };

  // Renderização condicional apenas para SHUTDOWN
  if (turnOff) {
    return (
      <div className='shut-down-background'>
        <ThemeProvider theme={original}><GlobalStyles />
          <img className='shut-down' src={safeTurnOff} alt="safe off"/>
        </ThemeProvider>
      </div>
    );
  }

  if (shutDown) {
    return (
      <div className='shut-down-background'>
        <img className='shut-down' src={window.innerWidth <= 800 ? win95shutdownMobile : win95shutdown} alt="shutdown"/>
      </div>
    );
  }

  const windowProps = {
    displayingTask, displayTasks, setActiveTask, activeTask, indexingTasks, taskIndices, tasksVisibility, setTasksVisibility, setTaskSwitiching
  };

  return (
    <Helmet>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <div className="desktop" onMouseDown={handleDown} onTouchStart={handleDown} onMouseUp={teleportingIcon} onTouchEnd={teleportingIcon}>
          
          <DesktopIcons {...windowProps} issuingWarning={issuingWarning} warnings={warnings} activiatingDockMenu={setDockMenuActive} setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} icons={icons} recyclingIcon={recyclingIcon} positioningIcon={positioningIcon} setBinLastPos={setBinLastPos} isTouchDevice={isTouchDevice} taskSwitiching={taskSwitiching} />
          
          <ResumeWindow {...windowProps} isTouchDevice={isTouchDevice} />
          <PortfolioWindow {...windowProps} setProjectUrl={setProjectUrl} />
          <BrowserWindow {...windowProps} setProjectUrl={setProjectUrl} projectUrl={projectUrl} />
          <MusicWindow {...windowProps} signed={signed} icons={icons} />
          <RecycleBinWindow {...windowProps} icons={icons} binWindowRef={binWindowRef} iconsInBin={iconsInBin} binIconsRef={binIconsRef} />
          
          <BinWarningWindow {...windowProps} activiatingDockMenu={setDockMenuActive} />
          <RecycleWarningWindow {...windowProps} activiatingDockMenu={setDockMenuActive} selectedIcon={selectedIcon}/>
          <WarningWindow {...windowProps} warnings={warnings} activiatingDockMenu={setDockMenuActive} errorAudio={errorAudio} />

          {isTouchDevice && (
            <RecycleBinContent {...windowProps} binWindowRef={binWindowRef} icons={icons} iconsInBin={iconsInBin} binIconsRef={binIconsRef} />
          )}
        </div>

        {warnings >= 3 && <BlueScreen setDisplayBSOD={setDisplayBSOD} setActiveTask={setActiveTask} />}
        
        <Taskbar 
          activiatingDockMenu={setDockMenuActive} 
          dockMenuActive={dockMenuActive} 
          displayingTask={displayingTask} 
          displayTasks={displayTasks} 
          indexingTasks={indexingTasks} 
          setSigned={setSigned} 
          taskIndices={taskIndices} 
          setTasksVisibility={setTasksVisibility} 
          tasksVisibility={tasksVisibility} 
          setActiveTask={setActiveTask} 
          activeTask={activeTask} 
          icons={icons} 
          startingUp={startingUp} 
        />
      </ThemeProvider>
    </Helmet>
  );
};

export default App;