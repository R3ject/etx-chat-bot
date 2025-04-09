(function () {
    const chatbotUrl = "https://starlit-narwhal-41657d.netlify.app"; // replace if needed
  
    const iframe = document.createElement("iframe");
    iframe.src = chatbotUrl;
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.right = "20px";
    iframe.style.width = "400px";
    iframe.style.height = "600px";
    iframe.style.border = "none";
    iframe.style.zIndex = "999999";
    iframe.style.borderRadius = "12px";
    iframe.setAttribute("title", "ETX Brewing Co. Chatbot");
  
    document.body.appendChild(iframe);
  })();
  