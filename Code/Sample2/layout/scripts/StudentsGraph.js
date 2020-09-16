var color = "gray";
var len = undefined;
/* var nodes = new vis.DataSet(); */
var nodes=[
  {
    "id": 0,
    "label": "Sunita",
    "group": 0,
    "x": 0,
    "y": 0
  },
  {
    "id": 1,
    "label": "Dinesh",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 2,
    "label": "Keerthi",
    "group": 0,
    "x": 0,
    "y": 0
  },
  {
    "id": 3,
    "label": "Aman",
    "group": 1,
    "x": 0,
    "y": 0
  },
  {
    "id": 4,
    "label": "Partho",
    "group": 1,
    "x": 0,
    "y": 0
  },
  {
    "id": 5,
    "label": "Sai",
    "group": 1,
    "x": 0,
    "y": 0
  },
  {
    "id": 6,
    "label": "Soumya",
    "group": 2,
    "x": 0,
    "y": 0
  },
  {
    "id": 7,
    "label": "Pavan",
    "group": 2,
    "x": 0,
    "y": 0
  },
  {
    "id": 8,
    "label": "Bishnu",
    "group": 2,
    "x": 0,
    "y": 0
  },
  {
    "id": 9,
    "label": "Ram",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 10,
    "label": "Rajesh",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 11,
    "label": "Harsha",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 12,
    "label": "Surya",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 13,
    "label": "Ravindra",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 14,
    "label": "Maithree",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 15,
    "label": "Aruna",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 16,
    "label": "Kishore",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 17,
    "label": "Rajeev",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 18,
    "label": "Hari",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 19,
    "label": "Sandhya",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 20,
    "label": "Karthik",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 21,
    "label": "Yaswanth",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 22,
    "label": "Priya",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 23,
    "label": "Bala",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 24,
    "label": "Sainadh",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 25,
    "label": "Vimal",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 26,
    "label": "Parul",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 27,
    "label": "Anusha",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 28,
    "label": "Bikram",
    "group": 3,
    "x": 0,
    "y": 0
  },
  {
    "id": 29,
    "label": "Bhanu",
    "group": 3,
    "x": 0,
    "y": 0
  }
];

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes
};
var options = {
  nodes: {
    shape: "dot",
    size: 10,
    
    font: {
      size: 32,
      color: "#ffffff"
    },
    borderWidth: 2
  },
  edges: {
    width: 2
  },
  groups: {
    0: {color:{background:'#FF3F4A', border:'#FF3F4A'}}
  }
};
network = new vis.Network(container, data, options);
