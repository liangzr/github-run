#!/bin/bash
################################################
# Github Draw                                  #
################################################
# Written by Benjamin Burkhart                 #
################################################
# What this does is:                           #
#                                              #
# 1) Generates a temp dir                      #
# 2) Sets github username/email to whatever    #
#    (This step is very important, make sure   #
#     it matches github's info)                #
# 3) Generates commits adhering to the time    #
#    pattern needed to generate a drawing in   #
#    the github activity visualization.        #
################################################
# KEY                                          #
# . - Blank square (no commits)                #
# SHADES                                       #
# o - 1 commits (lightest)                     #
# % - 2 commits                                #
# @ - 3 commits                                #
# # - 4 commits (darkest)                      #
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!#
# PLEASE NOTE THAT YOU HAVE TO USE ALL SYMBOLS #
# TO USE ALL SHADES                            #
################################################
# Syntax:                                      #
# bash github_draw.sh <directory name>         #
################################################
GithubUsername="liangzr"
GithubEmail="liangzr@outlook.com"

Drawing[0]="##%%@@@@###################################@@@@%%##"
Drawing[1]="##%%@@@@##########ooo##oooo#o###o##########@@@@%%##"
Drawing[2]="##%%@@@@##########o##o#o####oo##o##########@@@@%%##"
Drawing[3]="##%%@@@@##########oooo#oo###o#o#o##########@@@@%%##"
Drawing[4]="##%%@@@@##########o##o#o####o##oo##########@@@@%%##"
Drawing[5]="##%%@@@@##########ooo##oooo#o###o##########@@@@%%##"
Drawing[6]="##%%@@@@###################################@@@@%%##"

## Do not go past here unless you know what you're doing
DirectoryName="$1"

echo "Making directory ${DirectoryName}"
mkdir "${DirectoryName}"
cd "${DirectoryName}"

# Initialize the git repo
git init

git config --global user.name "${GithubUsername}"
git config --global user.email "${GithubEmail}"

# To multiple commit counts by
Multiplier=1

# Let's start 1 year ago
OneYearAgo=$(date --date='1 year ago' '+%Y-%m-%d')

# Get to the previous Sunday of that date a year ago
DaysToSubtract=$(date --date='1 year ago' '+%w')
PrevSunday=$(date --date=${OneYearAgo}' - '${DaysToSubtract}' days' '+%Y-%m-%d')

# Add 1 week to that date
StartDate=$(date --date=${PrevSunday}' + 1 weeks' '+%Y-%m-%d')
echo "Starting at ${StartDate}"

touch useless.txt
git add useless.txt

# For each column
for col in {0..51}; do
	# for each row
	for row in {0..6}; do
		line=${Drawing[$row]}

		if [ "${line:col:1}" = "#" ]; then
			for it in {1..10}; do
				echo "${StartDate} ${line:col:1} ${it}"# > useless.txt
				GIT_AUTHOR_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') GIT_COMMITTER_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') git commit ./useless.txt -m "${line:col:1} ${it}"
			done
		elif [ "${line:col:1}" = "@" ]; then
			for it in {1..7}; do
				echo "${StartDate} ${line:col:1} ${it}" > useless.txt
				GIT_AUTHOR_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') GIT_COMMITTER_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') git commit ./useless.txt -m "${line:col:1} ${it}"
			done
		elif [ "${line:col:1}" = "%" ]; then
			for it in {1..4}; do
				echo "${StartDate} ${line:col:1} ${it}" > useless.txt
				GIT_AUTHOR_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') GIT_COMMITTER_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') git commit ./useless.txt -m "${line:col:1} ${it}"
			done
		elif [ "${line:col:1}" = "o" ]; then
			for it in {1..1}; do
				echo "${StartDate} ${line:col:1} ${it}" > useless.txt
				GIT_AUTHOR_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') GIT_COMMITTER_DATE=$(date --date=${StartDate}' 12:00:00' --iso-8601='seconds') git commit ./useless.txt -m "${line:col:1} ${it}"
			done
		fi
		StartDate=$(date --date=${StartDate}' + 1 day' '+%Y-%m-%d')		
	done
done

echo "All done, you'll want to do"
echo " cd ${DirectoryName}"
# echo " git remote add origin https://github.com/<your github username>/<your github project>.git"