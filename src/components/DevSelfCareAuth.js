import React from "react";

const DevSelfCareAuth = () => {
  return (
    <>
      <Grid item md={8} xs={12}>
        <Header name="Showcase" />
      </Grid>
      <Grid item md={4} xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Hey! Everyone, I would love to get your feedback on</h1>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Title"
                variant="outlined"
                fullWidth
                className={classes.field}
                type="text"
                value={projectTitle}
                onChange={(e) => setprojectTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Link"
                variant="outlined"
                fullWidth
                className={classes.field}
                type="text"
                value={projectLink}
                onChange={(e) => setprojectLink(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="What your Project is about?"
                variant="outlined"
                fullWidth
                className={classes.field}
                type="text"
                multiline
                rows={4}
                value={projectDesc}
                onChange={(e) => setprojectDesc(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit it!
          </Button>
          <Grid container justify="flex-end"></Grid>
        </form>
      </Grid>
    </>
  );
};

export default DevSelfCareAuth;
