FROM node:26-slim

# Make a normal user (uid 1001, -m gives it a home dir)
RUN useradd -m -u 1001 runner

# install the TS runner globally (needs root + network - both available at build)
RUN npm install -g tsx

# the dir the code gets mounted into; also the working dir at runtime
WORKDIR /sandbox 
# everything after this runs as runner, not root
USER runner 

# wokrer bind-mounts the user's code to /sandbox/code.ts at runtime
ENTRYPOINT [ "tsx", "code.ts" ]