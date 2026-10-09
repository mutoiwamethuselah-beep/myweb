# ICT251 Activity 3 - Interactive Personal Website

By Methuselah Mutoiwa, second year Computer Science student, Mulungushi University.

A responsive student portfolio built with plain HTML5, CSS and JavaScript for Mulungushi University, ICT251 Web Technologies.

**Live site:** https://methuselah-portfolio.onrender.com

## Pages and sections
About Me, My Hobbies, My Learning Plan (with table), Projects and Skills, My Photos, My Media (video and audio) and Contact.

## JavaScript features (js/script.js)
1. **Contact form validation and preview** - rejects empty or spaces-only name and message and badly formatted emails. A valid form shows a summary on the page without reloading. The form is a browser demonstration only; no message is sent.
2. **Gallery viewer** - Previous and Next buttons change the photo and caption. The buttons are disabled at the first and last photo.
3. **Project filter** - filter by HTML, CSS or JavaScript, with a Reset button and a message when nothing matches.
4. **Theme switch** - toggles between light and dark themes and remembers the choice.

## How to test
- Run `index.html` with VS Code Live Server and open the browser Console (F12) to confirm there are no errors.
- Contact form: submit empty, then spaces only, then `abc` as the email, then valid data.
- Gallery: click Next to the last photo and Previous back to the first.
- Filter: click each category, then Reset.
- Theme: click Dark mode / Light mode, then refresh the page.
- Resize the browser to about 375 px and 1280 px wide and check there is no sideways scrolling.
- Press Tab to move through links and buttons and check the focus outline is visible.

## Folder structure
