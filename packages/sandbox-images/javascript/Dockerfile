FROM node:26-slim

# Make a normal user (uid 1001, -m gives it a home dir)
RUN useradd -m -u 1001 runner

# the dir the code gets mounted into; also the working dir at runtime
WORKDIR /sandbox
# everything after this runs as runner, not root
USER runner 

# wokrer bind-mounts the user's code to /sandbox/code.js at runtime
ENTRYPOINT ["node", "code.js"]