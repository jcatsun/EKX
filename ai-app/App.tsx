{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red14\green110\blue109;\red144\green1\blue18;\red15\green112\blue1;\red19\green118\blue70;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;\cssrgb\c3529\c52549\c34510;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf0 \strokec4  \cf5 \strokec5 React\cf0 \strokec4 , \{ useState, useEffect, useRef \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 'react'\cf0 \strokec4 ;\
\cf2 \strokec2 import\cf0 \strokec4  \{ \cf5 \strokec5 Message\cf0 \strokec4 , \cf5 \strokec5 ChatMode\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 './types'\cf0 \strokec4 ;\
\cf2 \strokec2 import\cf0 \strokec4  \{ geminiService \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 './services/geminiService'\cf0 \strokec4 ;\
\cf2 \strokec2 import\cf0 \strokec4  \cf5 \strokec5 MessageBubble\cf0 \strokec4  \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 './components/MessageBubble'\cf0 \strokec4 ;\
\cf2 \strokec2 import\cf0 \strokec4  \cf5 \strokec5 InputBar\cf0 \strokec4  \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 './components/InputBar'\cf0 \strokec4 ;\
\cf2 \strokec2 import\cf0 \strokec4  \{ \cf5 \strokec5 GearIcon\cf0 \strokec4 , \cf5 \strokec5 PlusIcon\cf0 \strokec4 , \cf5 \strokec5 CashIcon\cf0 \strokec4 , \cf5 \strokec5 TrendingUpIcon\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 './components/Icons'\cf0 \strokec4 ;\
\
\cf2 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 STORAGE_KEY\cf0 \strokec4  = \cf6 \strokec6 'ichat_messages_v2'\cf0 \strokec4 ;\
\cf2 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 MODE_KEY\cf0 \strokec4  = \cf6 \strokec6 'ichat_mode_v2'\cf0 \strokec4 ;\
\
\cf2 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 App\cf0 \strokec4 : \cf5 \strokec5 React\cf0 \strokec4 .\cf5 \strokec5 FC\cf0 \strokec4  = () => \{\
  \cf2 \strokec2 const\cf0 \strokec4  [messages, setMessages] = useState<\cf5 \strokec5 Message\cf0 \strokec4 []>([]);\
  \cf2 \strokec2 const\cf0 \strokec4  [isLoading, setIsLoading] = useState(\cf2 \strokec2 false\cf0 \strokec4 );\
  \cf2 \strokec2 const\cf0 \strokec4  [isSidebarOpen, setIsSidebarOpen] = useState(\cf2 \strokec2 false\cf0 \strokec4 );\
  \cf2 \strokec2 const\cf0 \strokec4  [mode, setMode] = useState<\cf5 \strokec5 ChatMode\cf0 \strokec4 >(\cf6 \strokec6 'general'\cf0 \strokec4 );\
  \cf2 \strokec2 const\cf0 \strokec4  scrollRef = useRef<\cf5 \strokec5 HTMLDivElement\cf0 \strokec4 >(\cf2 \strokec2 null\cf0 \strokec4 );\
\
  useEffect(() => \{\
    \cf2 \strokec2 const\cf0 \strokec4  savedMessages = localStorage.getItem(\cf5 \strokec5 STORAGE_KEY\cf0 \strokec4 );\
    \cf2 \strokec2 const\cf0 \strokec4  savedMode = localStorage.getItem(\cf5 \strokec5 MODE_KEY\cf0 \strokec4 );\
    \
    \cf2 \strokec2 if\cf0 \strokec4  (savedMessages) \{\
      setMessages(\cf5 \strokec5 JSON\cf0 \strokec4 .parse(savedMessages));\
    \}\
    \cf2 \strokec2 if\cf0 \strokec4  (savedMode) \{\
      setMode(savedMode \cf2 \strokec2 as\cf0 \strokec4  \cf5 \strokec5 ChatMode\cf0 \strokec4 );\
    \}\
\
    \cf7 \strokec7 // Optional: Check if a key selection is required (as per specific environment rules)\cf0 \strokec4 \
    \cf2 \strokec2 const\cf0 \strokec4  checkKey = \cf2 \strokec2 async\cf0 \strokec4  () => \{\
      \cf2 \strokec2 const\cf0 \strokec4  aiStudio = (window \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 any\cf0 \strokec4 ).aistudio;\
      \cf2 \strokec2 if\cf0 \strokec4  (aiStudio && \cf2 \strokec2 typeof\cf0 \strokec4  aiStudio.hasSelectedApiKey === \cf6 \strokec6 'function'\cf0 \strokec4 ) \{\
        \cf2 \strokec2 const\cf0 \strokec4  hasKey = \cf2 \strokec2 await\cf0 \strokec4  aiStudio.hasSelectedApiKey();\
        \cf2 \strokec2 if\cf0 \strokec4  (!hasKey) \{\
          console.info(\cf6 \strokec6 "Prompting for API Key selection..."\cf0 \strokec4 );\
          \cf7 \strokec7 // We don't automatically open it to avoid pop-up blocking, \cf0 \strokec4 \
          \cf7 \strokec7 // but we know it's missing.\cf0 \strokec4 \
        \}\
      \}\
    \};\
    checkKey();\
  \}, []);\
\
  useEffect(() => \{\
    localStorage.setItem(\cf5 \strokec5 STORAGE_KEY\cf0 \strokec4 , \cf5 \strokec5 JSON\cf0 \strokec4 .stringify(messages));\
  \}, [messages]);\
\
  useEffect(() => \{\
    localStorage.setItem(\cf5 \strokec5 MODE_KEY\cf0 \strokec4 , mode);\
  \}, [mode]);\
\
  useEffect(() => \{\
    \cf2 \strokec2 if\cf0 \strokec4  (scrollRef.current) \{\
      scrollRef.current.scrollTo(\{\
        top: scrollRef.current.scrollHeight,\
        behavior: \cf6 \strokec6 'smooth'\cf0 \strokec4 \
      \});\
    \}\
  \}, [messages, isLoading]);\
\
  \cf2 \strokec2 const\cf0 \strokec4  handleSendMessage = \cf2 \strokec2 async\cf0 \strokec4  (text: \cf2 \strokec2 string\cf0 \strokec4 , image?: \cf2 \strokec2 string\cf0 \strokec4 ) => \{\
    \cf2 \strokec2 const\cf0 \strokec4  userMessage: \cf5 \strokec5 Message\cf0 \strokec4  = \{\
      id: \cf5 \strokec5 Date\cf0 \strokec4 .now().toString(),\
      role: \cf6 \strokec6 'user'\cf0 \strokec4 ,\
      content: text,\
      timestamp: \cf5 \strokec5 Date\cf0 \strokec4 .now(),\
      image,\
    \};\
\
    setMessages(prev => [...prev, userMessage]);\
    setIsLoading(\cf2 \strokec2 true\cf0 \strokec4 );\
\
    \cf2 \strokec2 try\cf0 \strokec4  \{\
      \cf2 \strokec2 const\cf0 \strokec4  response = \cf2 \strokec2 await\cf0 \strokec4  geminiService.sendMessage(messages, text, mode, image);\
      \
      \cf2 \strokec2 const\cf0 \strokec4  assistantMessage: \cf5 \strokec5 Message\cf0 \strokec4  = \{\
        id: (\cf5 \strokec5 Date\cf0 \strokec4 .now() + \cf8 \strokec8 1\cf0 \strokec4 ).toString(),\
        role: \cf6 \strokec6 'assistant'\cf0 \strokec4 ,\
        content: response,\
        timestamp: \cf5 \strokec5 Date\cf0 \strokec4 .now(),\
      \};\
      \
      setMessages(prev => [...prev, assistantMessage]);\
    \} \cf2 \strokec2 catch\cf0 \strokec4  (error: \cf2 \strokec2 any\cf0 \strokec4 ) \{\
      console.error(error);\
      \cf2 \strokec2 const\cf0 \strokec4  errorMessage: \cf5 \strokec5 Message\cf0 \strokec4  = \{\
        id: (\cf5 \strokec5 Date\cf0 \strokec4 .now() + \cf8 \strokec8 1\cf0 \strokec4 ).toString(),\
        role: \cf6 \strokec6 'assistant'\cf0 \strokec4 ,\
        content: \cf6 \strokec6 `Error: \cf0 \strokec4 $\{error.message || \cf6 \strokec6 "Failed to connect to AI."\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 ,\
        timestamp: \cf5 \strokec5 Date\cf0 \strokec4 .now(),\
      \};\
      setMessages(prev => [...prev, errorMessage]);\
    \} \cf2 \strokec2 finally\cf0 \strokec4  \{\
      setIsLoading(\cf2 \strokec2 false\cf0 \strokec4 );\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf0 \strokec4  startNewChat = () => \{\
    \cf2 \strokec2 if\cf0 \strokec4  (messages.length === \cf8 \strokec8 0\cf0 \strokec4 ) \cf2 \strokec2 return\cf0 \strokec4 ;\
    \cf2 \strokec2 if\cf0 \strokec4  (window.confirm(\cf6 \strokec6 "Clear conversation history?"\cf0 \strokec4 )) \{\
      setMessages([]);\
      setIsSidebarOpen(\cf2 \strokec2 false\cf0 \strokec4 );\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf0 \strokec4  toggleMode = (newMode: \cf5 \strokec5 ChatMode\cf0 \strokec4 ) => \{\
    setMode(newMode);\
    setIsSidebarOpen(\cf2 \strokec2 false\cf0 \strokec4 );\
  \};\
\
  \cf2 \strokec2 const\cf0 \strokec4  openKeyPicker = \cf2 \strokec2 async\cf0 \strokec4  () => \{\
    \cf2 \strokec2 const\cf0 \strokec4  aiStudio = (window \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 any\cf0 \strokec4 ).aistudio;\
    \cf2 \strokec2 if\cf0 \strokec4  (aiStudio && \cf2 \strokec2 typeof\cf0 \strokec4  aiStudio.openSelectKey === \cf6 \strokec6 'function'\cf0 \strokec4 ) \{\
      \cf2 \strokec2 await\cf0 \strokec4  aiStudio.openSelectKey();\
    \} \cf2 \strokec2 else\cf0 \strokec4  \{\
      alert(\cf6 \strokec6 "This platform does not support dynamic key selection. Please set API_KEY in your environment variables."\cf0 \strokec4 );\
    \}\
  \};\
\
  \cf2 \strokec2 return\cf0 \strokec4  (\
    <div className=\cf6 \strokec6 "flex h-full bg-black text-white overflow-hidden font-sans selection:bg-blue-500/30"\cf0 \strokec4 >\
      \{\cf7 \strokec7 /* Sidebar */\cf0 \strokec4 \}\
      <div className=\{\cf6 \strokec6 `fixed inset-y-0 left-0 w-72 bg-[#1c1c1e] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-r border-[#38383a] \cf0 \strokec4 $\{isSidebarOpen ? \cf6 \strokec6 'translate-x-0 shadow-2xl shadow-black/80'\cf0 \strokec4  : \cf6 \strokec6 '-translate-x-full'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\
        <div className=\cf6 \strokec6 "p-6 h-full flex flex-col safe-top"\cf0 \strokec4 >\
          <div className=\cf6 \strokec6 "flex justify-between items-center mb-8"\cf0 \strokec4 >\
            <h2 className=\cf6 \strokec6 "text-2xl font-bold"\cf0 \strokec4 >\cf5 \strokec5 Options\cf0 \strokec4 </h2>\
            <button onClick=\{() => setIsSidebarOpen(\cf2 \strokec2 false\cf0 \strokec4 )\} className=\cf6 \strokec6 "text-blue-500 font-medium active:opacity-50 px-2 py-1"\cf0 \strokec4 >\cf5 \strokec5 Done\cf0 \strokec4 </button>\
          </div>\
          \
          <div className=\cf6 \strokec6 "space-y-6 flex-1 overflow-y-auto no-scrollbar"\cf0 \strokec4 >\
            <div>\
              <p className=\cf6 \strokec6 "text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1"\cf0 \strokec4 >\cf5 \strokec5 AI\cf0 \strokec4  \cf5 \strokec5 Mode\cf0 \strokec4 </p>\
              <div className=\cf6 \strokec6 "bg-[#2c2c2e] rounded-2xl overflow-hidden p-1"\cf0 \strokec4 >\
                <button \
                  onClick=\{() => toggleMode(\cf6 \strokec6 'general'\cf0 \strokec4 )\}\
                  className=\{\cf6 \strokec6 `flex items-center gap-3 w-full p-3 rounded-xl transition-all \cf0 \strokec4 $\{mode === \cf6 \strokec6 'general'\cf0 \strokec4  ? \cf6 \strokec6 'bg-[#3a3a3c] shadow-lg'\cf0 \strokec4  : \cf6 \strokec6 'opacity-40'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}\
                >\
                  <div className=\cf6 \strokec6 "w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"\cf0 \strokec4 >\
                    <\cf5 \strokec5 GearIcon\cf0 \strokec4  />\
                  </div>\
                  <span className=\cf6 \strokec6 "font-medium text-[15px]"\cf0 \strokec4 >\cf5 \strokec5 General\cf0 \strokec4  \cf5 \strokec5 AI\cf0 \strokec4 </span>\
                </button>\
                <button \
                  onClick=\{() => toggleMode(\cf6 \strokec6 'passive-income'\cf0 \strokec4 )\}\
                  className=\{\cf6 \strokec6 `flex items-center gap-3 w-full p-3 rounded-xl mt-1 transition-all \cf0 \strokec4 $\{mode === \cf6 \strokec6 'passive-income'\cf0 \strokec4  ? \cf6 \strokec6 'bg-[#3a3a3c] shadow-lg'\cf0 \strokec4  : \cf6 \strokec6 'opacity-40'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}\
                >\
                  <div className=\cf6 \strokec6 "w-8 h-8 bg-gradient-to-tr from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center text-white"\cf0 \strokec4 >\
                    <\cf5 \strokec5 CashIcon\cf0 \strokec4  />\
                  </div>\
                  <span className=\cf6 \strokec6 "font-medium text-[15px]"\cf0 \strokec4 >\cf5 \strokec5 Wealth\cf0 \strokec4  \cf5 \strokec5 Strategist\cf0 \strokec4 </span>\
                </button>\
              </div>\
            </div>\
\
            <div className=\cf6 \strokec6 "pt-6"\cf0 \strokec4 >\
               <button \
                onClick=\{openKeyPicker\}\
                className=\cf6 \strokec6 "flex items-center gap-3 w-full p-4 bg-[#2c2c2e] text-blue-500 rounded-2xl active:scale-95 transition-all font-medium border border-blue-500/20 mb-3"\cf0 \strokec4 \
              >\
                \cf5 \strokec5 Change\cf0 \strokec4  \cf5 \strokec5 API\cf0 \strokec4  \cf5 \strokec5 Key\cf0 \strokec4 \
              </button>\
              <button \
                onClick=\{startNewChat\}\
                className=\cf6 \strokec6 "flex items-center justify-center gap-3 w-full p-4 bg-[#2c2c2e] text-red-500 rounded-2xl active:scale-95 transition-all font-semibold"\cf0 \strokec4 \
              >\
                \cf5 \strokec5 Clear\cf0 \strokec4  \cf5 \strokec5 All\cf0 \strokec4  \cf5 \strokec5 Messages\cf0 \strokec4 \
              </button>\
            </div>\
          </div>\
          \
          <div className=\cf6 \strokec6 "mt-auto p-4 bg-[#2c2c2e]/50 rounded-2xl text-[12px] text-gray-400 safe-bottom"\cf0 \strokec4 >\
            <p className=\cf6 \strokec6 "font-bold text-white mb-1"\cf0 \strokec4 >\cf5 \strokec5 Local\cf0 \strokec4  \cf5 \strokec5 Storage\cf0 \strokec4  \cf5 \strokec5 Active\cf0 \strokec4 </p>\
            \cf5 \strokec5 Your\cf0 \strokec4  chats stay on \cf2 \strokec2 this\cf0 \strokec4  iPhone. \cf5 \strokec5 Powered\cf0 \strokec4  by \cf5 \strokec5 Gemini\cf0 \strokec4  \cf8 \strokec8 3\cf0 \strokec4 .\
          </div>\
        </div>\
      </div>\
\
      \{isSidebarOpen && (\
        <div \
          className=\cf6 \strokec6 "fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-500"\cf0 \strokec4 \
          onClick=\{() => setIsSidebarOpen(\cf2 \strokec2 false\cf0 \strokec4 )\}\
        />\
      )\}\
\
      <div className=\cf6 \strokec6 "flex flex-col flex-1 h-full w-full relative"\cf0 \strokec4 >\
        <header className=\cf6 \strokec6 "fixed top-0 left-0 right-0 z-30 bg-black/50 ios-blur border-b border-white/5 safe-top"\cf0 \strokec4 >\
          <div className=\cf6 \strokec6 "h-14 flex items-center justify-between px-6"\cf0 \strokec4 >\
            <button \
              onClick=\{() => setIsSidebarOpen(\cf2 \strokec2 true\cf0 \strokec4 )\}\
              className=\cf6 \strokec6 "p-2 -ml-2 text-blue-500 active:opacity-50"\cf0 \strokec4 \
            >\
              <svg xmlns=\cf6 \strokec6 "http://www.w3.org/2000/svg"\cf0 \strokec4  fill=\cf6 \strokec6 "none"\cf0 \strokec4  viewBox=\cf6 \strokec6 "0 0 24 24"\cf0 \strokec4  strokeWidth=\{\cf8 \strokec8 2.5\cf0 \strokec4 \} stroke=\cf6 \strokec6 "currentColor"\cf0 \strokec4  className=\cf6 \strokec6 "w-6 h-6"\cf0 \strokec4 >\
                <path strokeLinecap=\cf6 \strokec6 "round"\cf0 \strokec4  strokeLinejoin=\cf6 \strokec6 "round"\cf0 \strokec4  d=\cf6 \strokec6 "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"\cf0 \strokec4  />\
              </svg>\
            </button>\
            \
            <div className=\cf6 \strokec6 "flex flex-col items-center"\cf0 \strokec4 >\
              <span className=\{\cf6 \strokec6 `text-[17px] font-bold transition-colors \cf0 \strokec4 $\{mode === \cf6 \strokec6 'passive-income'\cf0 \strokec4  ? \cf6 \strokec6 'text-amber-400'\cf0 \strokec4  : \cf6 \strokec6 'text-white'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\
                \{mode === \cf6 \strokec6 'passive-income'\cf0 \strokec4  ? \cf6 \strokec6 'Wealth Pro'\cf0 \strokec4  : \cf6 \strokec6 'iChat'\cf0 \strokec4 \}\
              </span>\
              <div className=\cf6 \strokec6 "flex items-center gap-1"\cf0 \strokec4 >\
                <div className=\cf6 \strokec6 "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"\cf0 \strokec4 ></div>\
                <span className=\cf6 \strokec6 "text-[10px] text-gray-500 font-bold uppercase tracking-widest"\cf0 \strokec4 >\cf5 \strokec5 Active\cf0 \strokec4 </span>\
              </div>\
            </div>\
\
            <button \
              onClick=\{startNewChat\}\
              className=\cf6 \strokec6 "p-2 -mr-2 text-blue-500 active:opacity-50"\cf0 \strokec4 \
            >\
              <\cf5 \strokec5 PlusIcon\cf0 \strokec4  />\
            </button>\
          </div>\
        </header>\
\
        <main \
          ref=\{scrollRef\}\
          className=\cf6 \strokec6 "flex-1 overflow-y-auto pt-24 pb-4 px-4 no-scrollbar bg-black"\cf0 \strokec4 \
        >\
          \{messages.length === \cf8 \strokec8 0\cf0 \strokec4  && (\
            <div className=\cf6 \strokec6 "flex flex-col items-center justify-center min-h-[60vh] text-center px-10"\cf0 \strokec4 >\
              <div className=\{\cf6 \strokec6 `w-24 h-24 rounded-[28px] mb-8 shadow-2xl flex items-center justify-center transform transition-all duration-700 animate-in zoom-in-50 \cf0 \strokec4 $\{mode === \cf6 \strokec6 'passive-income'\cf0 \strokec4  ? \cf6 \strokec6 'bg-gradient-to-br from-amber-400 to-yellow-600 shadow-yellow-500/20'\cf0 \strokec4  : \cf6 \strokec6 'bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-blue-500/20'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\
                \{mode === \cf6 \strokec6 'passive-income'\cf0 \strokec4  ? <\cf5 \strokec5 CashIcon\cf0 \strokec4  /> : <\cf5 \strokec5 TrendingUpIcon\cf0 \strokec4  />\}\
              </div>\
              \
              <h1 className=\cf6 \strokec6 "text-3xl font-black text-white mb-3 tracking-tight"\cf0 \strokec4 >\
                \{mode === \cf6 \strokec6 'passive-income'\cf0 \strokec4  ? \cf6 \strokec6 'Build Wealth'\cf0 \strokec4  : \cf6 \strokec6 'Next-Gen AI'\cf0 \strokec4 \}\
              </h1>\
              \
              <p className=\cf6 \strokec6 "text-[16px] leading-relaxed text-gray-400 mb-10 max-w-xs"\cf0 \strokec4 >\
                \{mode === \cf6 \strokec6 'passive-income'\cf0 \strokec4  \
                  ? \cf6 \strokec6 "Architect your passive income strategy today."\cf0 \strokec4  \
                  : \cf6 \strokec6 "How can I assist you? I can see, hear, and think."\cf0 \strokec4 \}\
              </p>\
\
              <div className=\cf6 \strokec6 "w-full space-y-3 max-w-sm"\cf0 \strokec4 >\
                <button onClick=\{() => handleSendMessage(\cf6 \strokec6 "What are the best passive income ideas for 2025?"\cf0 \strokec4 )\} className=\cf6 \strokec6 "w-full p-4 bg-[#1c1c1e] rounded-2xl text-[14px] font-medium text-left border border-white/5 active:scale-[0.98] transition-transform"\cf0 \strokec4 >\
                  \cf6 \strokec6 "Passive income ideas for 2025..."\cf0 \strokec4 \
                </button>\
                <button onClick=\{() => handleSendMessage(\cf6 \strokec6 "Analyze my uploaded photo for business ideas."\cf0 \strokec4 )\} className=\cf6 \strokec6 "w-full p-4 bg-[#1c1c1e] rounded-2xl text-[14px] font-medium text-left border border-white/5 active:scale-[0.98] transition-transform"\cf0 \strokec4 >\
                  \cf6 \strokec6 "Analyze photo for business..."\cf0 \strokec4 \
                </button>\
              </div>\
            </div>\
          )\}\
          \
          <div className=\cf6 \strokec6 "flex flex-col"\cf0 \strokec4 >\
            \{messages.map((msg) => (\
              <\cf5 \strokec5 MessageBubble\cf0 \strokec4  key=\{msg.id\} message=\{msg\} />\
            ))\}\
          </div>\
          \
          \{isLoading && (\
            <div className=\cf6 \strokec6 "flex justify-start mt-2 mb-8 ml-2"\cf0 \strokec4 >\
              <div className=\cf6 \strokec6 "bg-[#1c1c1e] px-5 py-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1.5 shadow-xl"\cf0 \strokec4 >\
                <div className=\cf6 \strokec6 "w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"\cf0 \strokec4 ></div>\
                <div className=\cf6 \strokec6 "w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"\cf0 \strokec4 ></div>\
                <div className=\cf6 \strokec6 "w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"\cf0 \strokec4 ></div>\
              </div>\
            </div>\
          )\}\
        </main>\
\
        <div className=\cf6 \strokec6 "w-full z-40 bg-black safe-bottom"\cf0 \strokec4 >\
          <\cf5 \strokec5 InputBar\cf0 \strokec4  onSend=\{handleSendMessage\} isLoading=\{isLoading\} />\
        </div>\
      </div>\
    </div>\
  );\
\};\
\
\cf2 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 default\cf0 \strokec4  \cf5 \strokec5 App\cf0 \strokec4 ;\
\
}
