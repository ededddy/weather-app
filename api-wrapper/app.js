const Koa = require("koa");
const Router = require("koa-router");
const { default: Axios } = require("axios");

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  await next();
});

async function fetchWoeid(latt, long) {
  let woeid = null;
  const url = `https://www.metaweather.com/api/location/search/?lattlong=${latt},${long}`;
  try {
    let temp = await Axios.get(url);
    woeid = temp.data[0].woeid;
  } catch (error) {
    throw error;
  }
  return woeid;
}

router.get("/", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  const { latt, long } = ctx.query;
  const woeid = await fetchWoeid(latt, long);
  try {
    let ret = await Axios.get(
      `https://www.metaweather.com/api/location/${woeid}`
    );

    weatherCache = ret.data.consolidated_weather.slice(0, 5);
    ctx.body = ret.data.consolidated_weather.slice(0, 5);
  } catch (error) {
    ctx.body = error;
  }
});

router.get("/day/:year/:month/:date", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  const { year, month, date } = ctx.params;
  const { latt, long } = ctx.query;
  const woeid = await fetchWoeid(latt, long);
  try {
    const ret = await Axios.get(
      `https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${date}`
    );
    ctx.body = ret.data;
  } catch (error) {
    ctx.body = error;
  }
});

app.use(router.routes());
app.use(router.allowedMethods);
app.listen(7331);
