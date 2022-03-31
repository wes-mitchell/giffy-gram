export const footer = () => { 
  return `<footer class="footer">
  <p class="footer__item">&copy; ${new Date().getFullYear()} Fun Giffy Content via Giffygram</p>
  <button type="submit" id="myposts">See Mine Plz</button>
  <div class="footer__item">
      Posts since <select id="yearSelection">
          <option>2020</option>
          <option>2019</option>
          <option>2018</option>
          <option>2017</option>
      </select>
      <span id="postCount">0</span>
  </div>
</footer>`
}