FROM python:3.12-slim

# Make a normal user (uid 1001, -m gives it a home dir)
RUN useradd -m -u 1001 runner

# the dir the code gets mounted into; also the working dir at runtime
WORKDIR /sandbox 
# everything after this runs as runner, not root
USER runner 

# The worker bind-mounts the user's code to /sandbox/code.py
# -u = unbuffered, so we don't lose stdout if the container is killed
ENTRYPOINT [ "python3", "-u", "code.py" ]