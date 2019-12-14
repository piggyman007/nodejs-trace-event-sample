const trace_events = require("trace_events");
const { performance } = require("perf_hooks");

const tracing = trace_events.createTracing({
  categories: ["node.perf.usertiming"]
});

const sleep = seconds =>
  new Promise((resolve, reject) => setTimeout(() => resolve(), seconds * 1000));

const run = async () => {
  tracing.enable(); // enable tracing
  performance.mark("A");

  await sleep(3);
  performance.mark("B");
  performance.measure("A to B", "A", "B"); // measure time from A to B

  await sleep(8);
  performance.mark("C");
  performance.measure("B to C", "B", "C"); // measure time from B to C

  await sleep(1);
  performance.mark("D");
  performance.measure("C to D", "C", "D"); // measure time from C to D

  tracing.disable(); // disable tracing
};

run();
