import { parse } from "dotenv";
import https from "https";
import jwt from "jwt-simple";
import md5 from "md5";
import moment from "moment";

import { User } from "../models/user";
import { crearToken } from "../services/serviceToken";

const secret = "SecretGeoLogystoJW";

export const login = (req, res) => {
  let data = req.body;
  User.findOne({ email: data.email, password: md5(data.password) })
    .then((user) => {
      if (user) {
        let token = crearToken({ uid: user._id, email: user.email });
        res.status(200).json({ token }).end();
      } else {
        res.status(404).json({ error: "Not found" }).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err).end();
    });
};

export const register = async (req, res) => {
  let data = req.body;
  data.password = md5(data.password);
  data.created = moment().format("YYYY-MM-DD HH:mm");
  let set = new User(data);
  if (await User.findOne({ email: data.email }).catch(() => {})) {
    res.status(400).json({ error: "Email exists." }).end();
    return;
  }
  set
    .save()
    .then(() => {
      res.json({ message: "Success signUp." });
    })
    .catch((err) => {
      res.status(500).json(err).end();
    });
};

export const update = (req, res) => {
  let data = {};
  let user = jwt.decode(req.headers.authorization, secret);

  if (req.body.name) {
    data.name = req.body.name;
  }
  if (req.body.lastname) {
    data.lastname = req.body.lastname;
  }
  if (req.body.dni) {
    data.dni = req.body.dni;
  }
  if (req.body.password) {
    data.password = md5(req.body.password);
  }

  if (!Object.keys(data).length) {
    res.status(400).json({ error: "Empty content data" }).end();
    return;
  }

  User.updateOne({ _id: user.uid }, { $set: data })
    .then(() => {
      res.json({ message: "Success update." });
    })
    .catch((err) => {
      res.status(500).json(err).end();
    });
};

// uso de la funcion nativa para hacer llamados a otras api
function httpRequest(params, postData) {
  return new Promise(function (resolve, reject) {
    let req = https.request(params, function (res) {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error("statusCode=" + res.statusCode));
      }
      let body = [];
      res.on("data", function (chunk) {
        body.push(chunk);
      });
      res.on("end", function () {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });
    req.on("error", function (err) {
      reject(err);
    });
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

export const getCoordinates = async (req, res) => {
  let data = req.params;
  let lat = 0,
    lng = 0;
  let params = {
    hostname: "maps.googleapis.com",
    path: `/maps/api/geocode/json?address=${encodeURI(
      data.address
    )}&key=AIzaSyANVVkDC6JNomt7PHT2tj4a8m1qjaKCPho`,
  };
  if (!data.api) {
    await httpRequest(params)
      .then(async function (trae) {
        if (trae)
          if (trae.results && trae.status == "OK")
            if (trae.results[0]) {
              lat = trae.results[0].geometry.location.lat;
              lng = trae.results[0].geometry.location.lng;
            }
      })
      .catch((error) => {
        console.log(error);
      });

    if (!lat || !lng) {
      params.method = "GET";
      (params.hostname = "api.tomtom.com"),
        (params.port = null),
        (params.path = `/search/2/geocode/${encodeURI(
          data.address
        )}.json?key=cxfFQ0ubnnj91BVTZQ58LzLIOl3Ir2so`),
        (params.headers = {
          "cache-control": "no-cache",
        });

      await httpRequest(params)
        .then(async function (trae) {
          if (trae)
            if (trae.results)
              if (trae.results[0]) {
                lat = trae.results[0].position.lat;
                lng = trae.results[0].position.lon;
              }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } else if (data.api == 1) {
    await httpRequest(params)
      .then(async function (trae) {
        if (trae)
          if (trae.results && trae.status == "OK")
            if (trae.results[0]) {
              lat = trae.results[0].geometry.location.lat;
              lng = trae.results[0].geometry.location.lng;
            }
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (data.api == 2) {
    params.method = "GET";
    (params.hostname = "api.tomtom.com"),
      (params.port = null),
      (params.path = `/search/2/geocode/${encodeURI(
        data.address
      )}.json?key=cxfFQ0ubnnj91BVTZQ58LzLIOl3Ir2so`),
      (params.headers = {
        "cache-control": "no-cache",
      });
    await httpRequest(params)
      .then(async function (trae) {
        if (trae)
          if (trae.results)
            if (trae.results[0]) {
              lat = trae.results[0].position.lat;
              lng = trae.results[0].position.lon;
            }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  res.json({ lat: lat, lng: lng });
};
