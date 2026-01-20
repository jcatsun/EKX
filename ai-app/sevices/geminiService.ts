{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red14\green110\blue109;\red144\green1\blue18;\red15\green112\blue1;\red107\green0\blue1;\red19\green118\blue70;
}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;\cssrgb\c50196\c0\c0;\cssrgb\c3529\c52549\c34510;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf0 \strokec4  \{ \cf5 \strokec5 GoogleGenAI\cf0 \strokec4 , \cf5 \strokec5 GenerateContentResponse\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 "@google/genai"\cf0 \strokec4 ;\
\cf2 \strokec2 import\cf0 \strokec4  \{ \cf5 \strokec5 Message\cf0 \strokec4 , \cf5 \strokec5 ChatMode\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 "../types"\cf0 \strokec4 ;\
\
\cf2 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 SYSTEM_INSTRUCTIONS\cf0 \strokec4  = \{\
  general: \cf6 \strokec6 "You are a helpful, concise AI assistant in a premium iOS app. Keep responses punchy and use formatting like bolding for readability. Use emojis sparingly but effectively."\cf0 \strokec4 ,\
  \cf6 \strokec6 'passive-income'\cf0 \strokec4 : \cf6 \strokec6 "You are a world-class Wealth Strategist. Your goal is to help users design passive income systems. Focus on SaaS, Digital Products, and Automation. Be professional, analytical, and highly strategic."\cf0 \strokec4 \
\};\
\
\cf2 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 class\cf0 \strokec4  \cf5 \strokec5 GeminiService\cf0 \strokec4  \{\
  \cf2 \strokec2 private\cf0 \strokec4  getClient() \{\
    \cf7 \strokec7 // Note: In Vite/Vercel, process.env.API_KEY is usually replaced at build time or available in certain runtimes.\cf0 \strokec4 \
    \cf2 \strokec2 const\cf0 \strokec4  apiKey = (\cf2 \strokec2 import\cf0 \strokec4 .meta \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 any\cf0 \strokec4 ).env?.\cf5 \strokec5 VITE_API_KEY\cf0 \strokec4  || (process.env \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 any\cf0 \strokec4 ).\cf5 \strokec5 API_KEY\cf0 \strokec4 ;\
    \
    \cf2 \strokec2 if\cf0 \strokec4  (!apiKey) \{\
      console.warn(\cf6 \strokec6 "API_KEY not found in environment. Ensure it is set in Vercel settings."\cf0 \strokec4 );\
    \}\
    \
    \cf2 \strokec2 return\cf0 \strokec4  \cf2 \strokec2 new\cf0 \strokec4  \cf5 \strokec5 GoogleGenAI\cf0 \strokec4 (\{ apiKey: apiKey || \cf6 \strokec6 ""\cf0 \strokec4  \});\
  \}\
\
  \cf2 \strokec2 async\cf0 \strokec4  sendMessage(\
    history: \cf5 \strokec5 Message\cf0 \strokec4 [],\
    currentMessage: \cf2 \strokec2 string\cf0 \strokec4 ,\
    mode: \cf5 \strokec5 ChatMode\cf0 \strokec4  = \cf6 \strokec6 'general'\cf0 \strokec4 ,\
    image?: \cf2 \strokec2 string\cf0 \strokec4 \
  ): \cf5 \strokec5 Promise\cf0 \strokec4 <\cf2 \strokec2 string\cf0 \strokec4 > \{\
    \cf2 \strokec2 const\cf0 \strokec4  ai = \cf2 \strokec2 this\cf0 \strokec4 .getClient();\
    \cf2 \strokec2 const\cf0 \strokec4  modelName = \cf6 \strokec6 'gemini-3-flash-preview'\cf0 \strokec4 ;\
    \
    \cf2 \strokec2 const\cf0 \strokec4  parts: \cf2 \strokec2 any\cf0 \strokec4 [] = [\{ text: currentMessage \}];\
    \
    \cf2 \strokec2 if\cf0 \strokec4  (image) \{\
      \cf7 \strokec7 // Robust detection of MIME type for iOS photos\cf0 \strokec4 \
      \cf2 \strokec2 const\cf0 \strokec4  mimeType = image.match(\cf8 \strokec8 /data:([^;]+);base64/\cf0 \strokec4 )?.[\cf9 \strokec9 1\cf0 \strokec4 ] || \cf6 \strokec6 'image/jpeg'\cf0 \strokec4 ;\
      \cf2 \strokec2 const\cf0 \strokec4  base64Data = image.split(\cf6 \strokec6 ','\cf0 \strokec4 )[\cf9 \strokec9 1\cf0 \strokec4 ] || image;\
      parts.push(\{\
        inlineData: \{\
          data: base64Data,\
          mimeType: mimeType\
        \}\
      \});\
    \}\
\
    \cf2 \strokec2 try\cf0 \strokec4  \{\
      \cf2 \strokec2 const\cf0 \strokec4  response: \cf5 \strokec5 GenerateContentResponse\cf0 \strokec4  = \cf2 \strokec2 await\cf0 \strokec4  ai.models.generateContent(\{\
        model: modelName,\
        contents: [\
          ...history.slice(-\cf9 \strokec9 10\cf0 \strokec4 ).map(msg => (\{\
            role: msg.role === \cf6 \strokec6 'user'\cf0 \strokec4  ? \cf6 \strokec6 'user'\cf0 \strokec4  : \cf6 \strokec6 'model'\cf0 \strokec4 ,\
            parts: [\{ text: msg.content \}]\
          \})),\
          \{ role: \cf6 \strokec6 'user'\cf0 \strokec4 , parts: parts \}\
        ],\
        config: \{\
          systemInstruction: \cf5 \strokec5 SYSTEM_INSTRUCTIONS\cf0 \strokec4 [mode],\
          temperature: \cf9 \strokec9 0.7\cf0 \strokec4 ,\
        \}\
      \});\
\
      \cf2 \strokec2 return\cf0 \strokec4  response.text || \cf6 \strokec6 "I'm sorry, I couldn't generate a response."\cf0 \strokec4 ;\
    \} \cf2 \strokec2 catch\cf0 \strokec4  (error: \cf2 \strokec2 any\cf0 \strokec4 ) \{\
      console.error(\cf6 \strokec6 "Gemini API Error:"\cf0 \strokec4 , error);\
      \cf2 \strokec2 if\cf0 \strokec4  (error.message?.includes(\cf6 \strokec6 "API_KEY"\cf0 \strokec4 ) || error.message?.includes(\cf6 \strokec6 "invalid_key"\cf0 \strokec4 )) \{\
        \cf2 \strokec2 return\cf0 \strokec4  \cf6 \strokec6 "\uc0\u9888 \u65039  Configuration Error: Please check your Gemini API Key in the environment settings."\cf0 \strokec4 ;\
      \}\
      \cf2 \strokec2 return\cf0 \strokec4  \cf6 \strokec6 `\uc0\u9888 \u65039  Error: \cf0 \strokec4 $\{error.message || \cf6 \strokec6 "An unexpected error occurred."\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 ;\
    \}\
  \}\
\}\
\
\cf2 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  geminiService = \cf2 \strokec2 new\cf0 \strokec4  \cf5 \strokec5 GeminiService\cf0 \strokec4 ();\
}
