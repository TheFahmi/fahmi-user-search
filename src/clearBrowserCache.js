// This script helps clear browser cache and local storage
// You can run this in your browser console

function clearBrowserCache() {
  // Clear localStorage
  localStorage.clear();
  
  // Clear sessionStorage
  sessionStorage.clear();
  
  // Clear cookies (this is a simple approach, might not clear all cookies)
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  
  console.log('Browser cache cleared. Please refresh the page.');
}

// Execute the function
clearBrowserCache();
