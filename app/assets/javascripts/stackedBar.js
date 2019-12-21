function buildChart(data) {
    let margin = {top: 20, right: 100, bottom: 150, left: 200};
    let width = 960 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    // List of subgroups = header of the csv files = soil condition here
    let categories = ["likeCount","viewCount"];
    let titles = data.map((video) => video.title.substring(0,50)+'...')

    // append the svg object to the body of the page
    let svg = d3.select("#videoChart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    let x = d3.scaleBand()
        .domain(titles)
        .range([0, width])
        .padding([0.2])

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
        .attr("text-anchor", "end")
        .attr("transform", "translate(-10, 0) rotate(-20)");
        
    const maxVal = Math.max(...data.map((video) => 
      parseInt(video.likeCount ? video.likeCount : 0)+parseInt(video.viewCount ? video.viewCount : 0)))

    // Add Y axis
    let y = d3.scaleSqrt()
      .domain([0,maxVal])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    let color = d3.scaleOrdinal()
      .domain(categories)
      .range(['#e41a1c','#377eb8']);
    
    let stackedData = d3.stack()
       .keys(categories)(data);

    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("max-width", '200px')
        .style("z-index", "10")
        .style("background-color", "black")
        .style("border-radius", "4px")
        .style("font-size", "0.8em")
        .style("padding", "1em")
        .style("color", "white")
        .style("visibility", "hidden");

    // Show the bars
      svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
          .attr("fill", function(d) { return color(d.key); })
          .selectAll("rect")
          // enter a second time = loop subgroup per subgroup to add all rectangles
          .data(function(d) { return d; })
          .enter().append("rect")
            .attr("x", function(d) { return x(d.data.title.substring(0,50)+'...'); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width",x.bandwidth())

      // Do the tooltips
      svg.selectAll("g.tick text")
        .style('max-width', '150px')

      svg.selectAll("rect")  
        .on("mouseover", function(d){
          const viewCount = d.data.viewCount;
          const likeCount = d.data.likeCount;
          const tip = `${d.data.title}:<br>View Count: ${viewCount}<br>Like Count: ${likeCount}`;
          tooltip.html(tip)
          return tooltip.style("visibility", "visible");})
        .on("mousemove", function(d){
          return tooltip
            .style("top",(d3.event.pageY-30)+"px")
            .style("left",(d3.event.pageX+20)+"px");})
            .style("color", 'red')
        .on("mouseout", function(d){
          return tooltip.style("visibility", "hidden");});
      // Show the legend
      let legend = svg.selectAll(".legend")
        .data(categories)
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { 
            const vertical = margin.bottom+height-((i+2) * 20)
            return "translate(0," + vertical + ")"; })

          legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .attr("fill", color);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .attr("text-anchor", "end")
              .text(function(d) { return d; });
    }