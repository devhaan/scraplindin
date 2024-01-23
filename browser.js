const puppeteer = require("puppeteer");

async function scrollToXPath(page, xpath) {
  try {
    const elementHandle = await page.waitForXPath(xpath);

    // Add a small delay before scrolling (adjust as needed)
    await page.waitForTimeout(1000);

    await elementHandle.evaluate((element) => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });

    console.log(`Scrolled to element with XPath: ${xpath}`);
  } catch (error) {
    console.error(`Error scrolling to element: ${error.message}`);
  }
}

async function scrollToClass(page, className) {
  try {
    // Wait for the element with the specified class to be present
    await page.waitForSelector(`.${className}`, { timeout: 10000 });

    // Add a small delay before scrolling (adjust as needed)
    await page.waitForTimeout(1000);

    // Scroll to the element using page.evaluate
    await page.evaluate((className) => {
      const element = document.querySelector(`.${className}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, className);

    console.log(`Scrolled to element with class: ${className}`);
  } catch (error) {
    console.error(`Error scrolling to element: ${error.message}`);
  }
}

async function scrapeLinkedInJobs(country, jobType, techStack) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to LinkedIn jobs page
  await page.goto("https://www.linkedin.com/login");

  // Wait for the search results to load
  await page.waitForSelector("#username");
  await page.type("#username", "devendra.sourcebae.com@gmail.com", {
    delay: 150,
  });
  await page.waitForSelector("#password");
  await page.type("#password", "Devhaan@4522", { delay: 150 });
  await page.click(
    "#organic-div > form > div.login__form_action_container > button",
    { delay: 250 }
  );
  await page.waitForNavigation();
  // Add a small delay before scrolling (adjust as needed)
  await page.waitForTimeout(25000);
  await page.goto("https://www.linkedin.com/jobs");

  // Replace with your XPath expression
  let xpathExpression =
    "/html/body/div[6]/header/div/div/div/div[2]/div[2]/div/div/input[1]";

  let [inputElement] = await page.$x(xpathExpression);

  if (inputElement) {
    // Type text into the input field
    await inputElement.type(techStack, { delay: 250 });
  } else {
    console.error("Input element not found using XPath expression.");
  }

  // Replace with your XPath expression
  xpathExpression =
    "/html/body/div[6]/header/div/div/div/div[2]/div[3]/div/div/input[1]";

  [inputElement] = await page.$x(xpathExpression);

  if (inputElement) {
    // Type text into the input field
    await inputElement.type(country, { delay: 250 });
  } else {
    console.error("Input element not found using XPath expression.");
  }

  // Simulate pressing the Enter key
  await page.keyboard.press("Enter");
  // Add a delay (e.g., 1000 milliseconds or 1 second)
  await page.waitForTimeout(2000);

  // // Scroll to the element with the specified class
  // await scrollToClass(page, "jobs-search-results-list");

  // // Replace 'your-xpath' with the actual XPath expression for your element
  // xpathExpression =
  //   "/html/body/div[6]/div[3]/div[4]/div/div/main/div[2]/div[1]/div/div[5]/ul/li[1]/button/span"; // Example XPath

  // // // Scroll to the element with the specified XPath
  // await scrollToXPath(page, xpathExpression);

  //   await page.focus('#main > div.scaffold-layout__list-detail-inner > div.scaffold-layout__list > div');
  // await page.keyboard.press('Space');

  const scrollable_section = ".jobs-search-results-list";
  await page.waitForSelector(".jobs-search-results-list");


await page.evaluate(selector => {
  const scrollableSection = document.querySelector(selector);

  scrollableSection.scrollTop = scrollableSection.offsetHeight;
}, scrollable_section);

  // // Get an array of all <li> elements within the <ul>
  // const liElements = await page.$$('#main > div.scaffold-layout__list-detail-inner > div.scaffold-layout__list > div > ul > li');

  // // Loop through each <li> element and perform actions
  // let index = 0;

  // for (const liElement of liElements) {

  //   index += 1;
  //   // Replace with your XPath expression
  //   let xpathExpression = `/html/body/div[6]/div[3]/div[4]/div/div/main/div[2]/div[1]/div/ul/li[${index}]/div/div[1]/div[1]/div[2]/div[1]/a/strong`;
  //   await page.waitForXPath(xpathExpression);

  //   const [element] = await page.$x(xpathExpression);
  //   if (element) {
  //     const textContent = await page.evaluate(el => el.textContent, element);
  //     console.log(textContent);
  //   } else {
  //     console.error("Element not found using XPath expression 92 .");
  //   }
  // }

  // await browser.close();
}

// Example usage
const country = "United States";
const jobType = "Contract";
const techStack = "react js";

scrapeLinkedInJobs(country, jobType, techStack);
